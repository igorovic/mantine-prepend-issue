import { Button } from "@mantine/core";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div style={{ padding: "4rem" }}>
      <p>Here is the button ⬇️</p>
      <div
        style={{
          padding: "1rem",
          border: "1px solid rgba(0,0,0,0.5)",
          display: "inline-block",
        }}
      >
        <Button>Subscribe</Button>
      </div>
    </div>
  );
};

export default Home;
