import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// Function to generate a random date within the last year
const generateRandomDate = () => {
  const weeks = random.int(0, 54); // random week
  const days = random.int(0, 6);   // random day
  return moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(weeks, "w")
    .add(days, "d")
    .format();
};

// Function to create a single commit
const makeCommit = async () => {
  const date = generateRandomDate();
  const data = { date };

  await jsonfile.writeFile(path, data);       // Update JSON
  await git.add([path]);                      // Stage file
  await git.commit(`Commit for ${date}`, { '--date': date }); // Commit
  console.log(`Committed: ${date}`);
};

// Main function to generate multiple commits
const makeCommits = async (n) => {
  for (let i = 0; i < n; i++) {
    await makeCommit();
  }
  await git.push(); // Push all commits at once
  console.log("All commits pushed successfully!");
};

// Generate 100 commits
makeCommits(100);
