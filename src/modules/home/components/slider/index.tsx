"use client"

import { useState } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from "framer-motion"


interface CardData {
  id: number
  image: string
  label: string
  sub: string
}

interface CardProps {
  card: CardData
  index: number
  total: number
  isTop: boolean
  onDismiss: () => void
}

const MAX_VISIBLE = 4
const STACK_SHIFT_X = 70 // px to the right per level
const STACK_SHIFT_Y = -10 // px upward per level
const STACK_SCALE = 0.06
const DRAG_THRESHOLD = 100
const INFINITE = true


const cards: CardData[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    label: "COLLECTION 01",
    sub: "Off-White™ × Chicago Bulls",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    label: "COLLECTION 02",
    sub: "Leather Varsity Jacket",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    label: "COLLECTION 03",
    sub: "Abloh Streetwear Edit",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80",
    label: "COLLECTION 04",
    sub: "Basketball Court Capsule",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&q=80",
    label: "COLLECTION 05",
    sub: "Utility Denim Series",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    label: "COLLECTION 06",
    sub: "Archive Hoodie Reissue",
  },
]


function Card({ card, index, total, onDismiss, isTop }: CardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotate = useTransform(x, [-300, 300], [-22, 22])
  const opacity = useTransform(x, [-250, -100, 0, 100, 250], [0, 1, 1, 1, 0])

  const stackX: number = index * STACK_SHIFT_X
  const stackY: number = index * STACK_SHIFT_Y
  const scale: number = 1 - index * STACK_SCALE

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (
      Math.abs(info.offset.x) > DRAG_THRESHOLD ||
      Math.abs(info.offset.y) > DRAG_THRESHOLD
    ) {
      onDismiss()
    }
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        width: 320,
        height: "100%",
        left: 0,
        x: isTop ? x : stackX,
        y: isTop ? y : stackY,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        scale,
        zIndex: total - index,
        transformOrigin: "center center",
      }}
      initial={{
        scale: 1 - (index + 1) * STACK_SCALE,
        x: (index + 1) * STACK_SHIFT_X,
        y: (index + 1) * STACK_SHIFT_Y,
      }}
      animate={{ scale, x: isTop ? 0 : stackX, y: isTop ? 0 : stackY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 24,
          overflow: "hidden",
          background: "#111",
          boxShadow: isTop
            ? "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)"
            : `0 ${8 + index * 4}px ${20 + index * 8}px rgba(0,0,0,0.4)`,
          cursor: isTop ? "grab" : "default",
          userSelect: "none",
          position: "relative",
        }}
      >
        <img
          src={card.image}
          alt={card.label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            pointerEvents: "none",
            filter: isTop ? "none" : `brightness(${0.7 - index * 0.05})`,
          }}
          draggable={false}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
          }}
        />
        {isTop && (
          <div
            style={{ position: "absolute", bottom: 28, left: 24, right: 24 }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                fontSize: 11,
                letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 4,
                textTransform: "uppercase",
              }}
            >
              {card.label}
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                fontSize: 26,
                letterSpacing: "0.06em",
                color: "#fff",
                lineHeight: 1.1,
                textTransform: "uppercase",
              }}
            >
              {card.sub}
            </div>
          </div>
        )}
      
      </div>
    </motion.div>
  )
}

export default function StackedSlider() {
  const [deck, setDeck] = useState<CardData[]>(cards)
  const [dismissed, setDismissed] = useState<CardData[]>([])

 const handleDismiss = (): void => {
   setDeck((prev) => {
     if (prev.length === 0) return prev

     if (INFINITE) {
       const [first, ...rest] = prev
       return [...rest, first] 
     }

     return prev.slice(1) 
   })
 }

  const handleUndo = (): void => {
    if (dismissed.length === 0) return
    const last = dismissed[dismissed.length - 1]
    setDismissed((prev) => prev.slice(0, -1))
    setDeck((prev) => [last, ...prev])
  }

  const visible: CardData[] = deck.slice(0, MAX_VISIBLE)
  const remaining: number = deck.length

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        padding: "40px 20px",
      }}
    >
   
      <div style={{ position: "relative", width: 400, height: 510 }}>
        {deck.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 24,
              border: "1px dashed rgba(255,255,255,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.3)",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 36 }}>✦</div>
            <div
              style={{
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              End of Collection
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {visible.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                total={visible.length}
                isTop={index === 0}
                onDismiss={handleDismiss}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

    </div>
  )
}

      {
        /* Controls */
      }
      {
        /* <div
        style={{
          marginTop: 56,
          display: "flex",
          alignItems: "center",
          gap: 24,
          width: "100%",
          maxWidth: 440,
          justifyContent: "space-between",
        }}
      > */
      }
      {
        /* Counter */
      }
      {
        /* <div
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: 13,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
          }}
        >
          {remaining} / {cards.length}
        </div> */
      }

      {
        /* <div style={{ display: "flex", gap: 6 }}>
          {cards.map((c, i) => (
            <div
              key={c.id}
              style={{
                width: i < dismissed.length ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i < dismissed.length
                    ? "rgba(255,255,255,0.85)"
                    : i === dismissed.length
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div> */
      }

      {
        /* Undo */
      }
      {
        /* <motion.button
          onClick={handleUndo}
          disabled={dismissed.length === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            padding: "6px 14px",
            color:
              dismissed.length === 0
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.7)",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: dismissed.length === 0 ? "default" : "pointer",
            transition: "color 0.2s",
          }}
        >
          Undo
        </motion.button> */
      }
      {
        /* </div> */
      }

      {
        /* Swipe hint */
      }
      {
        /* {deck.length > 0 && (
        <div
          style={{
            marginTop: 20,
            fontSize: 11,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          ← Swipe in any direction →
        </div>
      )} */
      }