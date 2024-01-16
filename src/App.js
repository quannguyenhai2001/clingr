
import { Box, Container, Typography } from "@mui/material";
import introBackground from "./assets/intro-background-xl.webp";
import React, { useEffect, useState } from "react";
import { useSpring, animated, useScroll } from "@react-spring/web";
import './App.css';
function App() {
  const [offset, setOffset] = useState(0);
  const [text, setText] = useState([
    { text: 'Beautiful hair?' },
    { text: 'It is easy and' },
    { text: 'wonderful.' },
  ]);
  const containerRef = React.useRef(null)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const currentOffset = window.scrollY;
      setOffset(currentOffset);
    });
  }, []);
  const [textStyles, textApi] = useSpring(() => ({
    y: '100%',
  }))

  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.7) {
        textApi.start({ y: '0' })
      } else {
        textApi.start({ y: '100%' })
      }
    },
    default: {
      immediate: true,
    },
  })

  return (
    <Box>
      <Box
        component="div"
        width="100%"
        height="100vh"
        sx={{
          position: 'relative',
          backgroundImage: `url(${introBackground})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <Box sx={{
          margin: '0 50rem'
        }}>
          {text.map((t, i) => (
            <div
              key={i}
              style={{
                opacity: Math.max(0, 1 - offset / window.innerHeight * 3),
              }}
            >
              <Typography variant="h1" color="white" style={{ textAlign: 'center' }}>{t.text}</Typography>
            </div>
          ))}
        </Box>
        <Box sx={{
          position: 'absolute',
          bottom: '10rem',
          right: '20rem'
        }}>
          <iframe src="https://player.vimeo.com/video/724439058?title=0&amp;byline=0&amp;portrait=0&amp;muted=1&amp;autoplay=1&amp;pip=0&amp;controls=0&amp;loop=1&amp;background=1" allow="autoplay; encrypted-media" title="Clingr intro" allowfullscreen="true" data-ready="true"></iframe>
        </Box>
      </Box >
      <Box sx={{
        width: "100%",
        height: "100%",
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}>
        <animated.div
          className="dot"
          style={{
            clipPath: scrollYProgress.to(val => `circle(${val * 100}%)`),
          }}>
          <h1 className="title">
            <span>
              <animated.span style={textStyles}>Aha!</animated.span>
            </span>
            <span>
              <animated.span style={textStyles}>You found me!</animated.span>
            </span>
          </h1>
        </animated.div>
      </Box>
      <Box sx={{ height: '100vh' }}></Box>
    </Box>

  )
}

export default App;
