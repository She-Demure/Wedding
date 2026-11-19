"use client";

import { useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const floralImage =
  "https://images.unsplash.com/photo-1699830010147-8dc65aff2c29?auto=format&fit=crop&w=1200&q=90";
const backgroundFloralImage =
  "https://images.unsplash.com/photo-1651154872716-0f7a409a4dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3aGl0ZSUyMGZsb3dlcnMlMjBnb2xkJTIwd2VkZGluZyUyMGVsZWdhbnQlMjBjcmVhbSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzk1MDgzNjU2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const estateImage = "/couple-red-thread.jpg";

function FloatingPetals() {
  return (
    <div className="petal-field" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <i className={`petal petal-${index + 1}`} key={index} />
      ))}
    </div>
  );
}

function ScrollEffects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <motion.div className="scroll-decor" style={{ filter }} aria-hidden="true">
        <div className="ambient-glow ambient-one" />
        <div className="ambient-glow ambient-two" />
        <div className="background-floral background-floral-left">
          <img src={backgroundFloralImage} alt="" />
        </div>
        <div className="background-floral background-floral-right">
          <img src={backgroundFloralImage} alt="" />
        </div>
        <div className="gold-background-effect" />
        <FloatingPetals />
      </motion.div>
    </>
  );
}

export default function App() {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  return (
    <main className="invitation-page">
      <ScrollEffects />

      <div className="wedding-journey">
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
          <div className="timeline">
            <article>
              <span>10:30 AM</span>
              <div className="timeline-mark">
                <i />
              </div>
              <div>
                <h3>Guest Arrival &amp; Registration</h3>
                <p>Guests arrive at the venue, greet the couple’s families, and settle into their seats in preparation for the ceremony.</p>
                <p className="timeline-venue"><strong>Venue:</strong> 3rd Floor, Mangaladal Municipal Hall</p>
              </div>
            </article>
            <article>
              <span>11:00 AM</span>
              <div className="timeline-mark">
                <i />
              </div>
              <div>
                <h3>The Ceremony</h3>
                <p>The celebration of love begins! Witness the couple exchange their vows and promises of forever as they begin their journey together as husband and wife.</p>
                <p className="timeline-venue"><strong>Venue:</strong> 3rd Floor, Mangaladal Municipal Hall</p>
              </div>
            </article>
            <article>
              <span>12:00 NN</span>
              <div className="timeline-mark">
                <i />
              </div>
              <div>
                <h3>Wedding Reception &amp; Celebration</h3>
                <p>Join us as we continue the celebration with a delightful meal, heartfelt messages, fun moments, and joyful memories with family and friends.</p>
                <p className="timeline-venue"><strong>Venue:</strong> Kalye Tres Restaurant</p>
              </div>
            </article>
          </div>
        </section>

        <section className="details-section" aria-labelledby="details-title">
          <div className="section-heading">
            <p className="section-kicker">The finer details</p>
            <h2 id="details-title">For Our Guests</h2>
          </div>
          <div className="detail-grid">
            <article>
              <span className="detail-number">01</span>
              <div className="detail-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40">
                  <path d="M10 31h20M14 31V17l6-8 6 8v14M17 21h6M17 25h6" />
                </svg>
              </div>
              <h3>Stay</h3>
              <p>A room block is reserved at The Willow House, minutes from the estate.</p>
              <span className="detail-meta">Napa · California</span>
            </article>
            <article>
              <span className="detail-number">02</span>
              <div className="detail-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40">
                  <path d="M12 31c2-7 3-13 8-22 5 9 6 15 8 22M15 23h10M13 27h14" />
                </svg>
              </div>
              <h3>Attire</h3>
              <p>Formal garden attire in warm neutrals, soft pastels, and summer tones.</p>
              <span className="detail-meta">Elegant · Outdoor</span>
            </article>
            <article>
              <span className="detail-number">03</span>
              <div className="detail-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40">
                  <path d="M9 26h22M12 26l2-10h12l2 10M16 16l2-5h4l2 5M13 30h1M26 30h1" />
                </svg>
              </div>
              <h3>Travel</h3>
              <p>Complimentary shuttles will depart from our partner hotels at three o’clock.</p>
              <span className="detail-meta">Transport provided</span>
            </article>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-floral" aria-hidden="true">
            <img src={floralImage} alt="" />
          </div>
          <div className="closing-content">
            <p className="section-kicker">With love and anticipation</p>
            <div className="closing-monogram">
              S <span>&amp;</span> M
            </div>
            <h2>We hope you’ll join us</h2>
            <p>
              Your presence would make our celebration complete. Kindly respond by April 21, 2026.
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
          aria-label="Open Sheila Marie and Mark Joel's wedding invitation"
          onAnimationEnd={(event) => {
            if (isOpening && event.currentTarget === event.target) setIntroVisible(false);
          }}
        >
          <div className="intro-floral intro-floral-left" aria-hidden="true">
            <img src={floralImage} alt="" />
          </div>
          <div className="intro-floral intro-floral-right" aria-hidden="true">
            <img src={floralImage} alt="" />
          </div>
          <div className="intro-content">
            <p className="intro-kicker">You are cordially invited</p>
            <div className="intro-names">
              Sheila Marie <span>&amp;</span> Mark Joel
            </div>
            <p className="intro-date">21 · 06 · 2026</p>
            <button
              className="seal-button"
              onClick={() => setIsOpening(true)}
              aria-label="Open the invitation"
            >
              <span className="seal-ring">
                <b>S</b>
                <i>&amp;</i>
                <b>M</b>
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
                  S <span>&amp;</span> M
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
                <p className="modal-kicker">Répondez s’il vous plaît</p>
                <h2 id="rsvp-title">Will you join us?</h2>
                <p>Please reply by the twenty-first of April.</p>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                  }}
                >
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
                  <button className="button button-primary" type="submit">
                    Send response
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

