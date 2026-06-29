/**
 * Per-gem photos. Paste an image URL (https://…) or a /public path for each
 * gem id below. Leave "" to show a styled gradient placeholder instead of a
 * broken image. (Keys match the gem ids in lib/gems/data/*.ts.)
 */
export const gemImages: Record<string, string> = {
  // — Gobi / south —
  khongor: "",
  "yolyn-am": "",
  bayanzag: "",
  "khermen-tsav": "",
  gurvansaikhan: "",
  "tsagaan-suvarga": "",
  "baga-gazriin": "",
  "ikh-gazriin": "",
  khamar: "",
  "ikh-nart": "/ihnart.jpeg",
  senjit: "/senjidhad.jpeg",
  shargaljuut: "",
  "orog-nuur": "",
  bichigt: "",
  "choir-lus": "",
  // — Central —
  terelj: "",
  khustai: "",
  "chinggis-statue": "",
  manzushir: "",
  "turtle-rock": "",
  "orkhon-fall": "",
  "erdene-zuu": "",
  tuvkhun: "",
  "naiman-nuur": "",
  tsenkher: "",
  terkhiin: "",
  khorgo: "",
  taikhar: "",
  "uran-togoo": "",
  "khugnu-khan": "",
  "elsen-tasarkhai": "",
  amarbayasgalant: "",
  "eg-selenge": "",
  kharagiin: "",
  "erdenet-mine": "",
  // — West / east —
  "khuvsgul-lake": "",
  khoridol: "",
  uushgiin: "",
  jankhai: "",
  otgontenger: "",
  "khar-nuur": "",
  "eej-khairkhan": "",
  sutai: "",
  "khar-us": "",
  tsambagarav: "",
  "uvs-nuur": "",
  kharkhiraa: "",
  "tavan-bogd": "",
  khoton: "",
  "sagsai-eagle": "",
  "burkhan-khaldun": "",
  "baldan-bereeven": "",
  "deluun-boldog": "",
  "khalkhin-gol": "",
  "buir-nuur": "",
  "shiliin-bogd": "",
  "ganga-nuur": "",
};

/** Image URL for a gem, or null when none is set yet (→ gradient placeholder). */
export function gemImage(id: string): string | null {
  const url = gemImages[id];
  return url && url.length > 0 ? url : null;
}
