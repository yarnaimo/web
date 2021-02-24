import React from 'react'

export const Fonts = () => (
  <>
    {['Nunito+Sans:wght@400;600;700', 'Cabin:wght@400;600'].map((f, i) => (
      <link
        key={i}
        href={`https://fonts.googleapis.com/css2?family=${f}&display=swap`}
        rel="stylesheet"
      ></link>
    ))}
  </>
)
