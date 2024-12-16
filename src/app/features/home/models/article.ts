export interface Article {
  abstract?:       string;
  webURL?:         string;
  snippet?:        string;
  leadParagraph?:  string;
  source?:         string;
  multimedia?:     Multimedia[];
  headline?:       Headline;
  keywords?:       Keyword[];
  pubDate?:        string;
  documentType?:   string;
  newsDesk?:       string;
  sectionName?:    string;
  subsectionName?: string;
  byline?:         Byline;
  typeOfMaterial?: string;
  _id?:             string;
  wordCount?:      number;
  uri?:            string;
}

export interface Byline {
  original?:     string;
  person?:       Person[];
  organization?: null;
}

export interface Person {
  firstname?:    string;
  middlename?:   null | string;
  lastname?:     string;
  qualifier?:    null;
  title?:        null;
  role?:         string;
  organization?: string;
  rank?:         number;
}

export interface Headline {
  main?:          string;
  kicker?:        null;
  contentKicker?: null;
  printHeadline?: null;
  name?:          null;
  seo?:           null;
  sub?:           null;
}

export interface Keyword {
  name?:  string;
  value?: string;
  rank?:  number;
  major?: string;
}

export interface Multimedia {
  rank?:     number;
  subtype?:  string;
  caption?:  null;
  credit?:   null;
  type?:     Type;
  url?:      string;
  height?:   number;
  width?:    number;
  legacy?:   Legacy;
  subType?:  string;
  cropName?: string;
}

export interface Legacy {
  xlarge?:          string;
  xlargewidth?:     number;
  xlargeheight?:    number;
  thumbnail?:       string;
  thumbnailwidth?:  number;
  thumbnailheight?: number;
  widewidth?:       number;
  wideheight?:      number;
  wide?:            string;
}

export type Type = "image";
