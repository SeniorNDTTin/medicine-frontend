"use client"

import React from "react";

import { Button } from "@/components/ui/button";

function Header() {
  const handleClick = () => {
    console.log("OK"); 
  }

  return (
    <React.Fragment>
      <Button variant="outline" onClick={handleClick}>Btn Shadcn UI</Button>
      Header
    </React.Fragment>
  )
}

export default Header;