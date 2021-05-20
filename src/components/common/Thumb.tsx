import React from 'react'

export const Thumb = ({ url }: { url: string }) => (
  <img src={`${url}?w=192`} width="100%" height="100%" alt=""></img>
)
