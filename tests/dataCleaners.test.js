import { describe, it, expect } from "vitest";
import { cleanData } from "../utils/dataCleaners.js";

describe("cleanData", () => {
  it("should clean the data correctly", () => {
    const data = {
      song1: {
        samples: [
          {
            title: "sample1",
            artist: "artist1",
            sampleType: "sampleType1",
            genre: "genre1",
            detailUrl: "detailUrl1",
          },
        ],
        sampled: [
          {
            title: "sampled1",
            artist: "sampledArtist1",
            sampleType: "sampledType1",
            genre: "sampledGenre1",
            detailUrl: "sampledUrl1",
          },
        ],
      },
    }
    const expectedCleanedData = {
      song1: {
        samples: [
          {
            title: "sample1",
            artists: ["artist1"],
            sampleTypes: ["sampleType1"],
            genres: ["genre1"],
            detailUrl: "detailUrl1",
          },
        ],
        sampled: [
          {
            title: "sampled1",
            artists: ["sampledArtist1"],
            sampleTypes: ["sampledType1"],
            genres: ["sampledGenre1"],
            detailUrl: "sampledUrl1",
          },
        ],
      },
    };

    const cleanedData = cleanData(data);
    expect(cleanedData).toEqual(expectedCleanedData);
  });
});
