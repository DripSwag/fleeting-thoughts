"use client";

async function handleClick() {
  const response = await fetch("http://localhost:8001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "test", password: "test" }),
  });
  console.log(await response.json());
}

export default function Home() {
  return (
    <main>
      <button onClick={handleClick}>Test</button>
    </main>
  );
}
