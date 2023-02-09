import { useState } from "react";

export default () => {
  return (
    <div>
      <h3>Create Note</h3>
      <label>
        <h5>Title:</h5>
        <textarea name="" id="" cols="30" rows="1"></textarea>
      </label>
      <label>
        <h5>Description:</h5>
        <textarea name="" id="" cols="50" rows="10"></textarea>
      </label>
      <button type="submit">Sign Up</button>
    </div>
  );
};
