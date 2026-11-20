"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";

const floralImage =
  "https://images.unsplash.com/photo-1699830010147-8dc65aff2c29?auto=format&fit=crop&w=1200&q=90";
const backgroundFloralImage =
  "https://images.unsplash.com/photo-1651154872716-0f7a409a4dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3aGl0ZSUyMGZsb3dlcnMlMjBnb2xkJTIwd2VkZGluZyUyMGVsZWdhbnQlMjBjcmVhbSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzk1MDgzNjU2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const estateImage = "/couple-red-thread.jpg";
const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?action=TEMPLATE&dates=20261126%2F20261127&text=${encodeURIComponent("Sheila Marie & Mark Joel — Wedding")}&details=${encodeURIComponent("10:30 AM Guest Arrival at 3rd Floor, Mangaladal Municipal Hall\n11:00 AM Wedding Ceremony at 3rd Floor, Mangaladal Municipal Hall\n12:00 NN Wedding Reception at Kalye Tres Restaurant")}&location=${encodeURIComponent("Mangaladal Municipal Hall and Kalye Tres Restaurant")}`;

function FloatingPetals({ y }: { y: MotionValue<string> }) {
  return (
    <motion.div className="petal-field" style={{ y }} aria-hidden="true">
      {Array.from({ length: 20 }, (_, index) => (
        <i className={`petal petal-${index + 1}`} key={index} />
      ))}
    </motion.div>
  );
}

function ScrollEffects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const sceneProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const filter = useTransform(sceneProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  const farLayerY = useTransform(sceneProgress, [0, 1], ["0vh", "-20vh"]);
  const middleLayerY = useTransform(sceneProgress, [0, 1], ["0vh", "-44vh"]);
  const nearLayerY = useTransform(sceneProgress, [0, 1], ["0vh", "-78vh"]);
  const farLayerOpacity = useTransform(sceneProgress, [0, 0.5, 1], [0.34, 0.24, 0.12]);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <motion.div className="scroll-decor" style={{ filter }} aria-hidden="true">
        <div className="ambient-glow ambient-one" />
        <div className="ambient-glow ambient-two" />
        <motion.div className="background-floral background-floral-left" style={{ y: farLayerY, opacity: farLayerOpacity }}>
          <img src={backgroundFloralImage} alt="" />
        </motion.div>
        <motion.div className="background-floral background-floral-right" style={{ y: middleLayerY }}>
          <img src={backgroundFloralImage} alt="" />
        </motion.div>
        <motion.div className="gold-background-effect" style={{ y: farLayerY }} />
        <FloatingPetals y={nearLayerY} />
      </motion.div>
    </>
  );
}

export default function App() {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpError, setRsvpError] = useState("");
  const [introVisible, setIntroVisible] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  async function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRsvpSubmitting(true);
    setRsvpError("");
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          attendance: formData.get("attendance"),
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "We could not save your reply. Please try again.");
      }

      setSubmitted(true);
    } catch (error) {
      setRsvpError(error instanceof Error ? error.message : "We could not save your reply. Please try again.");
    } finally {
      setRsvpSubmitting(false);
    }
  }
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const weddingStart = new Date("2026-11-26T10:30:00+08:00").getTime();
    const updateCountdown = () => {
      const remaining = Math.max(0, weddingStart - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      setCountdown({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="invitation-page">
      <ScrollEffects />

      <div className="wedding-journey">
        <section className="couple-hero" aria-label="Wedding date for Sheila Marie and Mark Joel">
          <h1 className="hero-names"><span className="gold-shine">Sheila Marie</span><i>&amp;</i><span className="gold-shine">Mark Joel</span></h1>
          <div className="hero-ornament" aria-hidden="true"><span /><b>✦</b><span /></div>
          {countdown && (
            <div className="wedding-countdown" aria-label={`${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, and ${countdown.seconds} seconds until the wedding`}>
              {[
                [countdown.days, "Days"],
                [countdown.hours, "Hours"],
                [countdown.minutes, "Minutes"],
                [countdown.seconds, "Seconds"],
              ].map(([value, label]) => (
                <div className="countdown-unit" key={label}>
                  <strong>{String(value).padStart(2, "0")}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
          <p className="hero-date">26 <i>·</i> 11 <i>·</i> 2026</p>
          <p className="hero-date-caption">Thursday · The twenty-sixth of November</p>
          <a
            className="section-kicker calendar-save-button"
            href={googleCalendarUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Save the November 26, 2026 wedding date to your calendar"
          >
            Save the date
          </a>
        </section>

        <section className="story-section" id="our-story">
          <div className="story-image-wrap">
            <div className="story-image">
              <img
                src={estateImage}
                alt="Illustration of a couple linking their hands with a red thread"
              />
            </div>
          </div>
          <div className="story-copy">
            <h2>
              “I will marry my best friend, the person with whom I laugh, live, dream, and love.”
            </h2>
          </div>
        </section>

        <section className="schedule-section" aria-labelledby="schedule-title">
          <div className="section-heading">
            <h2 id="schedule-title">Wedding Day Timeline</h2>
          </div>
          <div className="timeline-layout">
            <div className="timeline">
              <article>
                <span className="timeline-time">10:30 AM</span>
                <div className="timeline-mark">
                  <i />
                </div>
                <div>
                  <h3>Guest Arrival</h3>
                  <p>Welcome and registration of guests.</p>
                  <p className="timeline-venue"><strong>Venue:</strong> 3rd Floor, Mangaladal Municipal Hall</p>
                </div>
              </article>
              <article>
                <span className="timeline-time">11:00 AM</span>
                <div className="timeline-mark">
                  <i />
                </div>
                <div>
                  <h3>The Ceremony</h3>
                  <p>Witness the couple exchange their vows and say “I do.”</p>
                  <p className="timeline-venue"><strong>Venue:</strong> 3rd Floor, Mangaladal Municipal Hall</p>
                </div>
              </article>
              <article>
                <span className="timeline-time">12:00 NN</span>
                <div className="timeline-mark">
                  <i />
                </div>
                <div>
                  <h3>Wedding Reception</h3>
                  <p>Enjoy a lovely meal and celebrate with the newlyweds!</p>
                  <p className="timeline-venue"><strong>Venue:</strong> Kalye Tres Restaurant</p>
                </div>
              </article>
            </div>
          </div>
          <div className="venue-buttons">
            <a className="venue-link" href="https://maps.app.goo.gl/f71kckEpfAWUGkT68" target="_blank" rel="noreferrer">View wedding venue <span>↗</span></a>
            <a className="venue-link" href="https://maps.app.goo.gl/AkjCkMA5Hxrz2VGR7" target="_blank" rel="noreferrer">View reception venue <span>↗</span></a>
          </div>
        </section>

        <section className="details-section" aria-labelledby="details-title">
          <div className="section-heading">
            <p className="section-kicker">With heartfelt gratitude</p>
            <h2 id="details-title">Principal Sponsors</h2>
          </div>
          <div className="sponsors-message">
            <span className="sponsor-ornament" aria-hidden="true">✦</span>
            <p>With love and gratitude for the guidance, support, and blessings of our principal sponsors.</p>
            <div className="sponsor-pairs">
              <div className="sponsor-pair">
                <span>Mrs. Jinky Q. De Vera</span>
                <span>Mr. Rene C. De Vera</span>
              </div>
              <div className="sponsor-pair">
                <span>Mrs. Angelica Z. Tamayo</span>
                <span>Mr. Armando M. Tamayo</span>
              </div>
            </div>
            <span className="sponsor-caption">A cherished part of our celebration</span>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-floral" aria-hidden="true">
            <img src={floralImage} alt="" />
          </div>
          <div className="closing-content">
            <p className="section-kicker">With love and anticipation</p>
            <div className="closing-monogram">
              S <span>&amp;</span> J
            </div>
            <h2>We hope you’ll join us</h2>
            <p>
              Your presence would make our celebration complete. Join us on November 26, 2026.
            </p>
            <button className="button button-primary" onClick={() => setRsvpOpen(true)}>
              RSVP to our wedding
            </button>
          </div>
        </section>
      </div>

      {introVisible && (
        <section
          className={`invitation-intro ${isOpening ? "intro-opening" : ""}`}
          aria-label="Open wedding invitation"
          onAnimationEnd={(event) => {
            if (isOpening && event.currentTarget === event.target) setIntroVisible(false);
          }}
        >
          <div className="intro-background" aria-hidden="true" />
          <div className="intro-content">
            <p className="intro-kicker">You are invited</p>
            <button
              className="seal-button"
              onClick={() => setIsOpening(true)}
              aria-label="Open the invitation"
            >
              <span className="seal-ring" aria-hidden="true">
                <b>S</b>
                <i>&amp;</i>
                <b>J</b>
              </span>
            </button>
            <button className="open-label" onClick={() => setIsOpening(true)}>
              Open invitation
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        </section>
      )}

      {rsvpOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setRsvpOpen(false)}>
          <section
            className="rsvp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setRsvpOpen(false)}
              aria-label="Close RSVP"
            >
              <span />
              <span />
            </button>
            {submitted ? (
              <div className="confirmation">
                <div className="confirmation-mark">
                  S <span>&amp;</span> J
                </div>
                <p className="modal-kicker">With gratitude</p>
                <h2 id="rsvp-title">Your reply is received</h2>
                <p>We cannot wait to celebrate this beautiful day with you.</p>
                <button className="button button-primary" onClick={() => setRsvpOpen(false)}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 id="rsvp-title">Will you join us?</h2>
                <p>The twenty-sixth of November, 2026.</p>
                <form onSubmit={submitRsvp}>
                  <label>
                    Name
                    <input required name="name" placeholder="Your full name" />
                  </label>
                  <label>
                    Response
                    <select name="attendance" defaultValue="accept">
                      <option value="accept">Joyfully accepts</option>
                      <option value="decline">Regretfully declines</option>
                    </select>
                  </label>
                  {rsvpError && <p className="rsvp-error" role="alert">{rsvpError}</p>}
                  <button className="button button-primary" type="submit" disabled={rsvpSubmitting}>
                    {rsvpSubmitting ? "Sending…" : "Send response"}
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

