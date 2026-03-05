"use client"
import { useRef, useState, useCallback, JSX } from "react"
import { motion, useInView } from "framer-motion"

// ─── Types ────────────────────────────────────────────────────────────────────

type Speaker = "human" | "cat" | "title"

interface Panel {
  text: string
  speaker: Speaker
}

interface StoryData {
  panels: Panel[]
}

interface CollectionData {
  title: string
  subtitle: string
  imageUrl: string
  accentColor: string
}

interface ChapterData {
  id: string
  chapter: string
  chapterSub: string
  story: StoryData
  collection?: CollectionData
}

interface DashProps {
  stroke: string
  strokeWidth: string
  strokeDasharray: string
  strokeLinecap: "round" | "butt" | "square"
  fill: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const timelineData: ChapterData[] = [
  {
    id: "ch2",
    chapter: "CH #2",
    chapterSub: "COLDPLAY",
    story: {
      panels: [
        { text: "WHAT ARE YOU DOING?", speaker: "human" },
        { text: "I'M WAITING!", speaker: "cat" },
        { text: "WAITING FOR WHAT?", speaker: "human" },
      ],
    },
    collection: {
      title: "COLDPLAY",
      subtitle: "AURA-9, Digital Collage Artist",
      imageUrl:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80",
      accentColor: "#7a1010",
    },
  },
  {
    id: "ch1",
    chapter: "CH #1",
    chapterSub: "THE BEATLES",
    story: {
      panels: [
        { text: "CATBOY!", speaker: "title" },
        { text: "HEY, HENRY.", speaker: "human" },
        { text: "OL—", speaker: "human" },
      ],
    },
    collection: {
      title: "THE BEATLES",
      subtitle: "AURA-9, Digital Collage Artist",
      imageUrl:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
      accentColor: "#0f2e12",
    },
  },
  {
    id: "ch0",
    chapter: "CH #0",
    chapterSub: "THE BEATLES",
    story: {
      panels: [
        { text: "CATBOY!", speaker: "title" },
        { text: "HEY, HENRY.", speaker: "human" },
        { text: "OL—", speaker: "human" },
      ],
    },
    collection: {
      title: "THE BEATLES",
      subtitle: "AURA-9, Digital Collage Artist",
      imageUrl:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
      accentColor: "#0f2e12",
    },
  },
]

// ─── Layout geometry (px) ─────────────────────────────────────────────────────
//
//  |←LABEL_W→|•|←c1H→|←── STORY CARD (starts at STORY_LEFT) ──────────→|
//             ↑ SPINE_X
//                      ↑ STORY_LEFT
//                             ↑ COLL_LEFT (STORY_LEFT + COLL_INDENT)
//
//  Connector #2 runs from STORY_LEFT straight DOWN to (COLL_LEFT, collMidY),
//  then a short horizontal jog RIGHT to plug into the collection card left edge.
//
const SPINE_X = 88 // main dotted spine X
const LABEL_W = 82 // chapter label block width
const STORY_LEFT = 108 // story card left edge
const COLL_INDENT = 56 // how much further right collection card is vs story
const COLL_LEFT = STORY_LEFT + COLL_INDENT // 164px — collection card left edge
const VERT_GAP = 44 // gap between story bottom and collection top
const DOT_TOP = 28 // spine dot Y from group top
const PATH_RADIUS = 18 

// ─── Background dot grid ─────────────────────────────────────────────────────

function DotPattern(): JSX.Element {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="dp"
          x="0"
          y="0"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dp)" />
    </svg>
  )
}

// ─── Global vertical spine ────────────────────────────────────────────────────

function VerticalSpine(): JSX.Element {
  return (
    <div
      className="absolute top-0 bottom-0 pointer-events-none"
      style={{ left: `${SPINE_X}px`, width: "2px", zIndex: 1 }}
      aria-hidden="true"
    >
      <motion.div
        className="w-full h-full"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        style={{
          transformOrigin: "top",
          background:
            "repeating-linear-gradient(to bottom,rgba(255,255,255,0.65) 0px,rgba(255,255,255,0.65) 5px,transparent 5px,transparent 12px)",
        }}
      />
    </div>
  )
}

// ─── Story (Comic) Card ───────────────────────────────────────────────────────

interface StoryCardProps {
  panels: Panel[]
}

function StoryCard({ panels }: StoryCardProps): JSX.Element {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden bg-white"
      style={{
        border: "2.5px solid #d1d5db",
        boxShadow: "0 6px 48px rgba(0,0,0,0.6)",
      }}
    >
      <div
        className="grid divide-x divide-gray-200"
        style={{
          gridTemplateColumns: `repeat(${panels.length}, 1fr)`,
          minHeight: "164px",
        }}
      >
        {panels.map((panel, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-between p-3 bg-white"
          >
            {/* Speech bubble */}
            <div
              className="relative bg-white border-[2px] border-black rounded-xl px-2 py-1 text-center"
              style={{
                fontFamily: "'Bangers', 'Impact', cursive",
                fontSize: "clamp(0.55rem, 1.4vw, 0.68rem)",
                letterSpacing: "0.04em",
                lineHeight: 1.25,
                maxWidth: "96%",
              }}
            >
              {panel.text}
              {/* Bubble tail — outer (black) */}
              <span
                className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 block"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "9px solid black",
                }}
              />
              {/* Bubble tail — inner (white fill) */}
              <span
                className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 block"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "7px solid white",
                }}
              />
            </div>

            {/* Character silhouette */}
            <div className="mt-4 flex items-end justify-center">
              {panel.speaker === "cat" ? (
                <svg
                  viewBox="0 0 64 72"
                  width="54"
                  height="62"
                  aria-hidden="true"
                >
                  <ellipse cx="32" cy="57" rx="21" ry="13" fill="#111" />
                  <circle cx="32" cy="37" r="15" fill="#111" />
                  <polygon points="18,26 11,10 23,22" fill="#111" />
                  <polygon points="46,26 53,10 41,22" fill="#111" />
                  <circle cx="26" cy="35" r="3" fill="white" />
                  <circle cx="38" cy="35" r="3" fill="white" />
                  <ellipse cx="32" cy="41" rx="4.5" ry="2" fill="#2a2a2a" />
                </svg>
              ) : panel.speaker === "title" ? (
                <div
                  style={{
                    fontFamily: "'Bangers',cursive",
                    fontSize: "1.8rem",
                    letterSpacing: "0.08em",
                    color: "#111",
                    lineHeight: 1,
                    WebkitTextStroke: "1px #111",
                  }}
                >
                  CATBOY!
                </div>
              ) : (
                <svg
                  viewBox="0 0 52 84"
                  width="38"
                  height="68"
                  aria-hidden="true"
                >
                  <circle
                    cx="26"
                    cy="20"
                    r="13"
                    fill="none"
                    stroke="#111"
                    strokeWidth="2.5"
                  />
                  <ellipse
                    cx="26"
                    cy="62"
                    rx="17"
                    ry="23"
                    fill="none"
                    stroke="#111"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="10"
                    y1="47"
                    x2="3"
                    y2="66"
                    stroke="#111"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="42"
                    y1="47"
                    x2="49"
                    y2="66"
                    stroke="#111"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Collection (Feature) Card ────────────────────────────────────────────────

interface CollectionCardProps {
  item: CollectionData
}

function CollectionCard({ item }: CollectionCardProps): JSX.Element {
  const [hovered, setHovered] = useState<boolean>(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full rounded-2xl overflow-hidden cursor-pointer"
      style={{
        minHeight: "270px",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.85),0 0 0 1px rgba(255,255,255,0.1)"
          : "0 10px 48px rgba(0,0,0,0.7)",
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${item.imageUrl})`,
          backgroundColor: item.accentColor,
          transform: hovered ? "scale(1.045)" : "scale(1)",
          transition: "transform 0.7s ease",
        }}
      />
      {/* Colour gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(140deg,${item.accentColor}e0 0%,rgba(0,0,0,0.2) 55%,rgba(0,0,0,0.72) 100%)`,
        }}
      />
      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      {/* Text content */}
      <div
        className="relative z-10 p-6 flex flex-col justify-end"
        style={{ minHeight: "270px" }}
      >
        <h2
          className="text-white leading-none mb-1"
          style={{
            fontFamily: "'Anton','Impact',sans-serif",
            fontSize: "clamp(1.8rem,5.5vw,2.8rem)",
            letterSpacing: "0.07em",
            textShadow: "2px 3px 10px rgba(0,0,0,0.6)",
          }}
        >
          {item.title}
        </h2>
        <p
          className="text-gray-300 italic"
          style={{
            fontFamily: "'Crimson Text',Georgia,serif",
            fontSize: "1rem",
          }}
        >
          {item.subtitle}
        </p>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="absolute bottom-5 right-5 flex items-center gap-1.5 px-4 py-2 rounded-full text-black font-bold"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            fontFamily: "'Anton',sans-serif",
            letterSpacing: "0.1em",
            fontSize: "0.78rem",
            backdropFilter: "blur(8px)",
          }}
        >
          VIEW
          <motion.span
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.18 }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─── Chapter Group ────────────────────────────────────────────────────────────
//
//  Connector path logic:
//
//  [CH #2 ]  •·····┐
//  [COLDP.]        ↓  ← Connector #1: spine dot → story card top-left (L: right then down)
//               ┌────────────────────────────────────┐
//               │  WHAT ARE   │  I'M WAIT.│ FOR WHAT │  ← STORY CARD
//               └────────────────────────────────────┘
//                    │  ← Connector #2: exits story bottom-left, goes DOWN
//                    │    hugging the LEFT EDGE of the collection card,
//                    │    and terminates at the VERTICAL MIDPOINT of that left edge
//                    │
//                    ●  ← arrival dot at mid-left of collection card
//                 ┌──┼─────────────────────────────┐
//                 │  │   COLDPLAY                  │  ← COLLECTION CARD
//                 │  │   AURA-9 ...    [View →]    │
//                 └────────────────────────────────┘

interface ChapterGroupProps {
  group: ChapterData
}

function ChapterGroup({ group }: ChapterGroupProps): JSX.Element {
  const groupRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(groupRef, { once: true, margin: "-50px" })

  // Measure both cards so we can compute the connector endpoint precisely
  const [storyH, setStoryH] = useState<number>(170)
  const [collH, setCollH] = useState<number>(270)

  const storyMeasureRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return
    const ro = new ResizeObserver(() => setStoryH(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const collMeasureRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return
    const ro = new ResizeObserver(() => setCollH(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ── Connector #1 geometry ──────────────────────────────────────────────────
  // L-shape: from spine dot → right to STORY_LEFT → short drop to story card top-left
  const c1H = STORY_LEFT - SPINE_X // horizontal run: 20px
  const c1V = 30 // short vertical drop to story card top-left corner

  // ── Connector #2 geometry ──────────────────────────────────────────────────
  //
  // Goal: a line that exits the story card's bottom-left, runs straight down,
  //       then makes a short horizontal jog RIGHT to plug into the collection
  //       card's left edge at its vertical midpoint.
  //
  // All Y values are relative to the group's top edge.
  //
  //   storyTopY     = DOT_TOP + 4 + c1V           (story card top)
  //   storyBottomY  = storyTopY + storyH           (story card bottom = connector start)
  //   collTopY      = storyBottomY + VERT_GAP      (collection card top)
  //   collMidY      = collTopY + collH / 2         (TARGET: mid-left of collection card)
  //
  // The SVG for connector #2 is anchored at (STORY_LEFT, storyBottomY).
  // Inside the SVG, coordinates are relative to that anchor:
  //   x=0 aligns with STORY_LEFT (story card left edge)
  //   x=COLL_INDENT aligns with COLL_LEFT (collection card left edge)
  //
  // Path: M0 0  →  V(vertDrop)  →  H(COLL_INDENT)
  //   where vertDrop = VERT_GAP + collH/2  (arrive at collection card's mid-left)
  //   The final H(COLL_INDENT) is the short jog RIGHT to plug into the card edge.

  const storyTopY = DOT_TOP + 4 + c1V
  const storyBottomY = storyTopY + storyH
  // Total vertical drop inside the SVG (from story bottom to collection card mid)
  const c2VertDrop = VERT_GAP + collH / 2
  // Horizontal jog at the bottom to reach collection card left edge
  const c2HorizJog = COLL_INDENT // = 56px

  const SVG_PADDING = 10 // extra px so the arrival dot isn't clipped

  const dash: DashProps = {
    stroke: "white",
    strokeWidth: "1.5",
    strokeDasharray: "5 5",
    strokeLinecap: "round",
    fill: "none",
  }

  return (
    <div ref={groupRef} className="relative mb-24">
      {/* ── Overlay layer: labels, spine dot, connectors ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 5 }}
        aria-hidden="true"
      >
        {/* Chapter label */}
        <div
          className="absolute text-right select-none"
          style={{ left: 0, top: `${DOT_TOP - 10}px`, width: `${LABEL_W}px` }}
        >
          <div
            style={{
              fontFamily: "'Anton','Impact',sans-serif",
              fontSize: "0.63rem",
              letterSpacing: "0.18em",
              color: "white",
              lineHeight: 1.3,
            }}
          >
            {group.chapter}
          </div>
          <div
            style={{
              fontFamily: "'Anton','Impact',sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.42)",
              marginTop: "2px",
            }}
          >
            {group.chapterSub}
          </div>
        </div>

        {/* Spine dot */}
        <motion.div
          className="absolute rounded-full bg-black"
          style={{
            width: 11,
            height: 11,
            border: "2.5px solid white",
            left: `${SPINE_X - 5}px`,
            top: `${DOT_TOP - 1}px`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
        />

        {/* Connector #1 — spine → story card top-left corner */}
        <svg
          className="absolute overflow-visible"
          style={{
            left: `${SPINE_X}px`,
            top: `${DOT_TOP + 4}px`,
            width: `${c1H + 4}px`,
            height: `${c1V + 4}px`,
            overflow: "visible",
          }}
        >
          <motion.path
            d={`M0 0 H${c1H} V${c1V}`}
            stroke="white"
            strokeWidth={1.5}
            strokeDasharray="6 6"
            strokeDashoffset={200}
            strokeLinecap="round"
            fill="none"
            initial={{ strokeDashoffset: 200, opacity: 0 }}
            animate={isInView ? { strokeDashoffset: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </svg>

        {/* Connector #2 — story card bottom-left → collection card mid-left
            Path: vertical drop from STORY_LEFT down to coll mid-Y,
                  then short horizontal jog right to COLL_LEFT (card edge).
            SVG is anchored at (STORY_LEFT, storyBottomY).                        */}
        {group.collection && (
          <svg
            className="absolute overflow-visible"
            style={{
              left: `${STORY_LEFT}px`,
              top: `${storyBottomY}px`,
              // SVG must be wide enough to cover the horizontal jog (COLL_INDENT)
              // and tall enough to cover the full vertical drop
              width: `${c2HorizJog + SVG_PADDING}px`,
              height: `${c2VertDrop + SVG_PADDING}px`,
              overflow: "visible",
            }}
          >
            {/* Down then jog right — lands exactly at collection card mid-left */}
            <motion.path
              d={` M0 0
  V${c2VertDrop - PATH_RADIUS}
  Q0 ${c2VertDrop} ${PATH_RADIUS} ${c2VertDrop}
  H${c2HorizJog}`}
              {...dash}
              initial={{ strokeDashoffset: 200, opacity: 0 }}
              animate={isInView ? { strokeDashoffset: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
            />
            {/* Arrival dot — sits exactly at collection card mid-left (x=COLL_INDENT) */}
            <motion.circle
              cx={c2HorizJog}
              cy={c2VertDrop}
              r="4.5"
              fill="black"
              stroke="white"
              strokeWidth="2.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.3 }}
            />
          </svg>
        )}
      </div>

      {/* ── Story card ── */}
      <div
        style={{
          paddingLeft: `${STORY_LEFT}px`,
          paddingTop: `${storyTopY - 4}px`,
        }}
      >
        <motion.div
          ref={storyMeasureRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
        >
          <StoryCard panels={group.story.panels} />
        </motion.div>
      </div>

      {/* ── Collection card ── */}
      {group.collection && (
        <div
          style={{ paddingLeft: `${COLL_LEFT}px`, marginTop: `${VERT_GAP}px` }}
        >
          <motion.div
            ref={collMeasureRef}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <CollectionCard item={group.collection} />
          </motion.div>
        </div>
      )}
    </div>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────

interface StaggeredTimelineProps {
  data?: ChapterData[]
}

export default function StaggeredTimeline({
  data = timelineData,
}: StaggeredTimelineProps): JSX.Element {
  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ backgroundColor: "#000", fontFamily: "sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Crimson+Text:ital@0;1&family=Bangers&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <DotPattern />

      {/* Header */}
      <div className="relative z-10 pt-16 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-gray-500 tracking-[0.45em] uppercase mb-2"
            style={{ fontFamily: "'Anton',sans-serif", fontSize: "0.62rem" }}
          >
            Archive
          </p>
          <h1
            className="text-white"
            style={{
              fontFamily: "'Anton','Impact',sans-serif",
              fontSize: "clamp(2.2rem,8vw,3.5rem)",
              letterSpacing: "0.14em",
            }}
          >
            TIMELINE
          </h1>
          <div
            className="mx-auto mt-3 h-px w-16"
            style={{
              background:
                "linear-gradient(to right,transparent,white,transparent)",
            }}
          />
        </motion.div>
      </div>

      {/* Timeline */}
      <div
        className="relative z-10 mx-auto px-4 pb-36 pt-4"
        style={{ maxWidth: "820px" }}
      >
        <VerticalSpine />

        {data.map((group) => (
          <ChapterGroup key={group.id} group={group} />
        ))}

        {/* Spine end dot */}
        <motion.div
          className="absolute rounded-full bg-white"
          style={{
            width: 8,
            height: 8,
            left: `${SPINE_X - 4}px`,
            bottom: "8.5rem",
            opacity: 0.3,
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  )
}
