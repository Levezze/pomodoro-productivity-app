import React from "react"

export function Button({ buttonText, handleClick }) {
  return <button onClick={handleClick}>{buttonText}</button>;
}