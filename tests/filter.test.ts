import { describe, expect, it } from "vitest";
import { filterToHash, matches, parseFilter } from "@/lib/filter";

describe("parseFilter", () => {
  it("reads each filter from its hash", () => {
    expect(parseFilter("#work")).toBe("work");
    expect(parseFilter("#about")).toBe("about");
    expect(parseFilter("#contact")).toBe("contact");
  });
  it("sends the old #experience anchor to About", () => {
    expect(parseFilter("#experience")).toBe("about");
  });
  it("falls back to All for empty or unknown hashes", () => {
    expect(parseFilter("")).toBe("all");
    expect(parseFilter("#")).toBe("all");
    expect(parseFilter("#foo")).toBe("all");
  });
  it("ignores case", () => {
    expect(parseFilter("#WORK")).toBe("work");
  });
});

describe("filterToHash", () => {
  it("drops the hash for All", () => expect(filterToHash("all")).toBe(""));
  it("prefixes other filters with #", () => expect(filterToHash("work")).toBe("#work"));
});

describe("matches", () => {
  it("All matches every category", () => expect(matches("work", "all")).toBe(true));
  it("a filter matches its own category", () => expect(matches("work", "work")).toBe(true));
  it("a filter rejects other categories", () => expect(matches("about", "work")).toBe(false));
});
