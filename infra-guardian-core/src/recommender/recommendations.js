import fs from "fs";
import yaml from "js-yaml";

const rules = yaml.load(
  fs.readFileSync(
    new URL("../rules/pod.rules.yaml", import.meta.url),
    "utf8"
  )
);

export function recommend(issue) {
  const matchedRules = rules.rules.filter(rule => {
    if (rule.when?.issue && rule.when.issue === issue.issue) {
      return true;
    }

    if (
      rule.when?.restarts_gt !== undefined &&
      issue.restarts > rule.when.restarts_gt
    ) {
      return true;
    }

    return false;
  });

  return matchedRules.flatMap(r => r.recommendation);
}