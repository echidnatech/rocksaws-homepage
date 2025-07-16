document.querySelector("#domainname").outerHTML = location.hostname;
document.title = location.hostname;

const target = document.querySelector("#ip");
const steps = document.querySelectorAll(".hidden");

const sleep = (time = 16) =>
  new Promise((resolve) => setTimeout(resolve, time));

const [addr, me] = await Promise.all([
  await fetch("/cgi-bin/hostname").then((i) => i.text()),
  await fetch("/cgi-bin/me").then((i) => i.text()),
  sleep(1500),
]);

target.classList.add("real");
target.textContent = "";
await sleep(500);

for (const char of addr.trim().replace(/\.$/, "")) {
  target.append(char);
  await sleep();
}
for (const step of steps) {
  const message = step.textContent.replace(
    /bzaz\.au/g,
    `${location.hostname} ${me}`,
  );
  step.classList.remove("hidden");
  step.textContent = "";

  for (const char of message) {
    step.append(char);
    await sleep();
  }
  await sleep(Number(step.getAttribute("data-delay") ?? 1000));
}

export {};
