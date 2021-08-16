import { best } from "./best";
import { love } from "./love";
import { first } from "./1st";
import { second } from "./2nd";
import { third } from "./3thd";
import { chiptune } from "./chiptune";

export const modules = [
  "tracks/xm/1999/Alexkidd.xm",
  "tracks/xm/1999/BRAZIL.XM",
  "tracks/xm/1999/Batman_love_my_dog!.xm",
  "tracks/xm/1999/CHEWIE.XM",
  "tracks/xm/1999/Catgroove.xm",
  "tracks/xm/1999/Couille2.xm",
  "tracks/xm/1999/Couille_gauche.xm",
  "tracks/xm/1999/FOLIE.XM",
  "tracks/xm/1999/JAMI.XM",
  "tracks/xm/1999/JazzOnTheMoOn!.xm",
  "tracks/xm/1999/Mouche4.xm",
  "tracks/xm/1999/Ninja.xm",
  "tracks/xm/1999/Piaku.xm",
  "tracks/xm/1999/SOULG.XM",
  "tracks/xm/1999/STRANGE.XM",
  "tracks/xm/1999/Trip2.xm",
  "tracks/xm/2000/analogik_2000.xm",
  "tracks/xm/2000/analogik_Boite.xm",
  "tracks/xm/2000/analogik_DARTAGNA.XM",
  "tracks/xm/2000/analogik_Jibe-theme.xm",
  "tracks/xm/2000/analogik_La_crotte_qui_parle.xm",
  "tracks/xm/2000/analogik_Le_pied_gauche.xm",
  "tracks/xm/2000/analogik_Le_poulet_est_cuit.xm",
  "tracks/xm/2000/analogik_Oiseau_qui_pete.xm",
  "tracks/xm/2000/analogik_Potager.xm",
  "tracks/xm/2000/analogik_cho7.xm",
  "tracks/xm/2000/analogik_coline.xm",
  "tracks/xm/2000/analogik_nia.xm",
  "tracks/xm/2000/analogik_nopseeking_med_and_kenet.xm",
  "tracks/xm/2000/analogik_poisson.xm",
  "tracks/xm/2000/analogik_zougi.mod",
  "tracks/xm/2000/condense_BAME1.xm",
  "tracks/xm/2000/condense_BAME2.xm",
  "tracks/xm/2000/condense_CONCEPT.XM",
  "tracks/xm/2000/condense_Cornflakes2.xm",
  "tracks/xm/2000/echellon_Dream.xm",
  "tracks/xm/2000/jecoute_FEUILLE2.XM",
  "tracks/xm/2000/med_canelle.xm",
  "tracks/xm/2000/med_funkastar.XM",
  "tracks/xm/2000/med_houche_les_galouix.xm",
  "tracks/xm/2000/med_inMyHouse.xm",
  "tracks/xm/2000/med_jeanrenedisco.XM",
  "tracks/xm/2000/med_lovecow.xm",
  "tracks/xm/2000/med_lovely2.XM",
  "tracks/xm/2000/med_menu.XM",
  "tracks/xm/2000/med_odesay.xm",
  "tracks/xm/2000/med_patate_funky.xm",
  "tracks/xm/2000/med_shaggy.XM",
  "tracks/xm/2000/med_soulg.XM",
  "tracks/xm/2000/med_winner.XM",
  "tracks/xm/2000/med_zen2K.XM",
  "tracks/xm/2000/vitaminic_FIGHT22.XM",
  "tracks/xm/2001/analogik_2VOICES.XM",
  "tracks/xm/2001/analogik_2VOICES2.XM",
  "tracks/xm/2001/analogik_3VIL.XM",
  "tracks/xm/2001/analogik_DEEP.XM",
  "tracks/xm/2001/analogik_Rakiz.xm",
  "tracks/xm/2001/condense_mamadisco.xm",
  "tracks/xm/2001/coolphat_ninjaslipdecombat.xm",
  "tracks/xm/2001/jecoute_DADDYSEX.XM",
  "tracks/xm/2001/jecoute_DOUBOOM.XM",
  "tracks/xm/2001/jecoute_back2lyon.xm",
  "tracks/xm/2001/jecoute_daddyremix2001.xm",
  "tracks/xm/2001/mutantInc_upermarch.xm",
  "tracks/xm/2001/razor_raz2.xm",
  "tracks/xm/2001/tvnet_ADVERTIS.XM",
  "tracks/xm/2001/tvnet_ART.XM",
  "tracks/xm/2001/tvnet_BUBBLE.XM",
  "tracks/xm/2001/tvnet_CINEMA.XM",
  "tracks/xm/2001/tvnet_COMPUTE2.XM",
  "tracks/xm/2001/tvnet_COMPUTER.XM",
  "tracks/xm/2001/tvnet_CURRY.XM",
  "tracks/xm/2001/tvnet_DOT.XM",
  "tracks/xm/2001/tvnet_DOT_FLOWER.XM",
  "tracks/xm/2001/tvnet_Discolor.xm",
  "tracks/xm/2001/tvnet_E-COM.XM",
  "tracks/xm/2001/tvnet_EDUCAT.XM",
  "tracks/xm/2001/tvnet_Earth.xm",
  "tracks/xm/2001/tvnet_FASHION.XM",
  "tracks/xm/2001/tvnet_FINANCE.XM",
  "tracks/xm/2001/tvnet_FOOD.XM",
  "tracks/xm/2001/tvnet_GAME.XM",
  "tracks/xm/2001/tvnet_HEALTH.XM",
  "tracks/xm/2001/tvnet_HERE.XM",
  "tracks/xm/2001/tvnet_HUMAN.XM",
  "tracks/xm/2001/tvnet_INTERNET.XM",
  "tracks/xm/2001/tvnet_JACKPOT.XM",
  "tracks/xm/2001/tvnet_JAIL.XM",
  "tracks/xm/2001/tvnet_LANDSCAP.XM",
  "tracks/xm/2001/tvnet_MECHWR.XM",
  "tracks/xm/2001/tvnet_MUSIC.XM",
  "tracks/xm/2001/tvnet_NATION.XM",
  "tracks/xm/2001/tvnet_NEW2.XM",
  "tracks/xm/2001/tvnet_OFFLINE.XM",
  "tracks/xm/2001/tvnet_PRESS.XM",
  "tracks/xm/2001/tvnet_REALESTA.XM",
  "tracks/xm/2001/tvnet_SHOOT.XM",
  "tracks/xm/2001/tvnet_SPIRAL.XM",
  "tracks/xm/2001/tvnet_SPORT.XM",
  "tracks/xm/2001/tvnet_SYMBOLS.XM",
  "tracks/xm/2001/tvnet_TOOLS.XM",
  "tracks/xm/2001/tvnet_TOYS.XM",
  "tracks/xm/2001/tvnet_TOYS2.XM",
  "tracks/xm/2001/tvnet_TRANSPOR.XM",
  "tracks/xm/2001/tvnet_TV.XM",
  "tracks/xm/2001/tvnet_VEGETAL.XM",
  "tracks/xm/2001/tvnet_WEDDING.XM",
  "tracks/xm/2001/tvnet_WIND2D.XM",
  "tracks/xm/2001/tvnet_XMAS.XM",
  "tracks/xm/2001/tvnet_mirror_cubes.xm",
  "tracks/xm/2001/tvnet_misc.XM",
  "tracks/xm/2001/tvnet_new_school_tiles.xm",
  "tracks/xm/2002/condense_KANCE.XM",
  "tracks/xm/2002/lgf_4.MOD",
  "tracks/xm/2002/lgf_5.MOD",
  "tracks/xm/2002/lgf_DEEPTHROAT.XM",
  "tracks/xm/2002/lgf_GUIMOVE.XM",
  "tracks/xm/2002/lgf_HALLO2K2.XM",
  "tracks/xm/2002/lgf_INTROINV.XM",
  "tracks/xm/2002/lgf_METAL.XM",
  "tracks/xm/2002/lgf_MYTH.XM",
  "tracks/xm/2002/lgf_XMAS.XM",
  "tracks/xm/2002/med_atable.XM",
  "tracks/xm/2002/med_supadupafly.mod",
  "tracks/xm/2002/med_vodka.XM",
  "tracks/xm/2002/med_where_is_my_poney.xm",
  "tracks/xm/2002/scenemusic_intro.xm",
  "tracks/xm/2003/jecoute_Le_chemin_Mauve.xm",
  "tracks/xm/2003/med_sexy_potatoes_2.xm",
  "tracks/xm/early-age-1993/CAPONE.MOD",
  "tracks/xm/early-age-1993/DREAM.MOD",
  "tracks/xm/early-age-1993/FLUIDE.mod",
  "tracks/xm/early-age-1993/SAHARA.MOD",
  "tracks/xm/early-age-1993/STORM.MOD",
  "tracks/xm/early-age-1993/STORMY.MOD",
  "tracks/xm/early-age-1993/YEAH.mod",
  "tracks/xm/early-age-1994/FOUND.MOD",
  "tracks/xm/early-age-1994/JAZZY.MOD",
  "tracks/xm/early-age-1994/SING.MOD",
  "tracks/xm/early-age-1995/ALPHA.MOD",
  "tracks/xm/early-age-1995/JUMP.XM",
  "tracks/xm/early-age-1995/MOVE.MOD",
  "tracks/xm/early-age-1995/RAI.MOD",
  "tracks/xm/early-age-1995/RECTO.MOD",
  "tracks/xm/early-age-1995/SEXY.MOD",
  "tracks/xm/early-age-1995/ST2.MOD",
  "tracks/xm/early-age-1996/7GUNS.MOD",
  "tracks/xm/early-age-1996/BOUFFON.MOD",
  "tracks/xm/early-age-1996/BRAZI.MOD",
  "tracks/xm/early-age-1996/BRAZIL.MOD",
  "tracks/xm/early-age-1996/HUBERT.XM",
  "tracks/xm/early-age-1996/INFAME-TRAHISON.MOD",
  "tracks/xm/early-age-1996/LASCAR.MOD",
  "tracks/xm/early-age-1996/RABRA.MOD",
  "tracks/xm/early-age-1996/ROOM.MOD",
  "tracks/xm/early-age-1996/STYLE.MOD",
  "tracks/xm/early-age-1996/Violon.xm",
  "tracks/xm/early-age-1997/ACIDJA97.MOD",
  "tracks/xm/early-age-1997/CAPTIV97.MOD",
  "tracks/xm/early-age-1997/DECISI97.XM",
  "tracks/xm/early-age-1997/FULL97.MOD",
  "tracks/xm/early-age-1997/LEGACY.MOD",
  "tracks/xm/early-age-1997/SACRIF.XM",
  "tracks/xm/early-age-1997/WHITE.XM",
  "tracks/xm/early-age-1997/violin.mod",
  "tracks/xm/early-age-1998/ACT3.XM",
  "tracks/xm/early-age-1998/ACT4.XM",
  "tracks/xm/early-age-1998/COMA.XM",
  "tracks/xm/early-age-1998/CONTRA.XM",
  "tracks/xm/early-age-1998/FOUND.XM",
  "tracks/xm/early-age-1998/GROOVE00.XM",
  "tracks/xm/early-age-1998/IMPACT.XM",
  "tracks/xm/early-age-1998/INSPECTE.XM",
  "tracks/xm/early-age-1998/MAITRISE.XM",
  "tracks/xm/early-age-1998/PARIS.XM",
  "tracks/xm/early-age-1998/SOUL.XM",
  "tracks/xm/early-age-1998/TOMB.XM",
];

export function getList() {
  const list = [];
  for (let f in modules) {
    let d = modules[f].split("/");
    if (typeof list[d[2]] === "undefined") {
      list[d[2]] = [];
    }
    list[d[2]].push({
      filename: modules[f],
      name: d[3],
    });
  }

  const mapList = [];
  for (let year in list) {
    mapList.push({
      year,
      mods: list[year],
    });
  }
  return mapList;
}

export function isFirst(name) {
  return first.indexOf(name) !== -1;
}
export function isSecond(name) {
  return second.indexOf(name) !== -1;
}
export function isThird(name) {
  return third.indexOf(name) !== -1;
}
export function isBest(name) {
  return best.indexOf(name) !== -1;
}
export function isLove(name) {
  return love.indexOf(name) !== -1;
}
export function isChiptune(name) {
  return chiptune.indexOf(name) !== -1;
}
