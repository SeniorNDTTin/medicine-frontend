import React from "react";

import { Button } from "antd";

function GoBack() {
  const handleClick = () => {
    window.history.back();
  }

  return (
    <React.Fragment>
      <Button
        type="primary"
        onClick={handleClick}
      >
        Trở lại
      </Button>
    </React.Fragment>
  )
}

export default GoBack;