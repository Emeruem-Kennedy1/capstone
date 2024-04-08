import { describe, it, expect } from "vitest";
import { buildWhoSampledURL } from "../utils/urlBuilder";

describe("buildWhoSampledURL", () => {
  it("returns the correct URL for the 'samples' relationship", () => {
    const artistName = "Kanye West";
    const songTitle = "Gold Digger";
    const relationship = "samples";

    const expected = {
      base: "https://www.whosampled.com/Kanye-West/Gold-Digger/",
      relationship:
        "https://www.whosampled.com/Kanye-West/Gold-Digger/samples/",
    };
    const actual = buildWhoSampledURL(artistName, songTitle, relationship);

    expect(actual).toEqual(expected);
  });

  it("returns the correct URL for the 'sampled' relationship", () => {
    const artistName = "Kanye West";
    const songTitle = "Gold Digger";
    const relationship = "sampled";

    const expected = {
      base: "https://www.whosampled.com/Kanye-West/Gold-Digger/",
      relationship:
        "https://www.whosampled.com/Kanye-West/Gold-Digger/sampled/",
    };
    const actual = buildWhoSampledURL(artistName, songTitle, relationship);

    expect(actual).toEqual(expected);
  });

  it("formats artist names and song titles correctly", () => {
    const artistName = "Jay-Z";
    const songTitle = "Otis";
    const relationship = "samples";

    const expected = {
      base: "https://www.whosampled.com/Jay-Z/Otis/",
      relationship: "https://www.whosampled.com/Jay-Z/Otis/samples/",
    };
    const actual = buildWhoSampledURL(artistName, songTitle, relationship);

    expect(actual).toEqual(expected);
  });

  it("formats special characters correctly", () => {
    const artistSongNames = [
      ["Rihanna", "S&M"],
      ["Dr. Dre", "Nuthin' but a 'G' Thang"],
      ["Beyoncé", "SMOKE HOUR ★ WILLIE NELSON"],
      ["Flo Milli", "Never Lose Me (With SZA & Cardi B)"],
    ];
    const relationship = "samples";

    const expected = [
      {
        base: "https://www.whosampled.com/Rihanna/S%26M/",
        relationship: "https://www.whosampled.com/Rihanna/S%26M/samples/",
      },
      {
        base: "https://www.whosampled.com/Dr.-Dre/Nuthin%27-but-a-%27G%27-Thang/",
        relationship:
          "https://www.whosampled.com/Dr.-Dre/Nuthin%27-but-a-%27G%27-Thang/samples/",
      },
      {
        base: "https://www.whosampled.com/Beyonc%C3%A9/SMOKE-HOUR-%E2%98%85-WILLIE-NELSON/",
        relationship:
          "https://www.whosampled.com/Beyonc%C3%A9/SMOKE-HOUR-%E2%98%85-WILLIE-NELSON/samples/",
      },
      {
        base: "https://www.whosampled.com/Flo-Milli/Never-Lose-Me-(With-SZA-%26-Cardi-B)/",
        relationship:
          "https://www.whosampled.com/Flo-Milli/Never-Lose-Me-(With-SZA-%26-Cardi-B)/samples/",
      },
    ];

    const actual = artistSongNames.map(([artistName, songTitle]) =>
      buildWhoSampledURL(artistName, songTitle, relationship)
    );

    expect(actual).toEqual(expected);
  });
});
