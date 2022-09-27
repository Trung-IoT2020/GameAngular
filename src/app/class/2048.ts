// export class _512 extends Phaser.Scene {
//   constructor() {
//     let petitNom = "512";
//     super({ key: petitNom });
//     this.petitNom = petitNom;
//   }
//
//   preload() {
//     this.load.image("repeating-background", "../assets/background.png");
//   }
//
//   create() {
//     this.touches = this.input.keyboard.addKeys({
//       haut: paramGlobaux.haut,
//       bas: paramGlobaux.bas,
//       gauche: paramGlobaux.gauche,
//       droite: paramGlobaux.droite
//     });
//
//     // You can access the game's config to read the width & height
//     const { width, height } = this.sys.game.config;
//
//     // Creating a repeating background sprite
//     const bg = this.add.tileSprite(0, 0, width, height, "repeating-background").setOrigin(0, 0);
//
//     /* Les différents textes à afficher */
//     this.add.text(10, 10, "512", {
//       fontFamily: "sans-serif",
//       fontSize: "40px",
//       color: "white",
//       fontStyle: "bold"
//     });
//
//     this.texteDefaite = this.add
//       .text(width / 2, height / 2, "Oh, on dirait que vous avez perdu", {
//         font: "40px sans-serif",
//         color: "white",
//         backgroundColor: "black"
//       })
//       .setOrigin(0.5, 0.5)
//       .setDepth(1)
//       .setVisible(0);
//
//     this.texteVictoire = this.add
//       .text(width / 2, height / 2, "512, félécitations !", {
//         font: "40px sans-serif",
//         color: "white",
//         backgroundColor: "black"
//       })
//       .setOrigin(0.5, 0.5)
//       .setDepth(1)
//       .setVisible(0);
//
//     this.texteChrono = this.add.text(10, 560, "00:00", {
//       font: "30px sans-serif",
//       color: "white"
//     });
//
//     /* Le chronomètre (incrémenté toutes les secondes) */
//     this.chrono = 0;
//     this.chronoJeu = this.time.addEvent({
//       delay: 1000,
//       callback: this.avancerChrono,
//       callbackScope: this,
//       loop: true
//     });
//
//     this.jeuGagne = false;
//     this.jeuPerdu = false;
//
//     /* Définition des paramètres de jeu */
//     this.MESURES = {
//       TAILLE_CARREAUX: 100,
//       ECHELLE_IMAGES: 1,
//       NOMBRE_CARREAUX_COTE: 4,
//       TAILLE_INTERSTICE: 5,
//       BORD_CADRE: 20
//     };
//
//     this.couleursTemp = [
//       0xcdc1b4,
//       0xeee4da,
//       0xede0c8,
//       0xf2b179,
//       0xf59563,
//       0xf67c5f,
//       0xf65e3b,
//       0xedcf72,
//       0xedcc61,
//       0xedc850,
//       0xedc53f,
//       0xedc22e,
//       0x3c3a32
//     ];
//
//     /* Définition de tailles à partir de celles définies précédement */
//     let cote_cadre_int =
//       this.MESURES.NOMBRE_CARREAUX_COTE * this.MESURES.TAILLE_CARREAUX +
//       (this.MESURES.NOMBRE_CARREAUX_COTE + 1) * this.MESURES.TAILLE_INTERSTICE;
//     let cote_cadre_ext = cote_cadre_int + 2 * this.MESURES.BORD_CADRE;
//
//     /* "Bord du fond", gris */
//     this.add.rectangle(width / 2, height / 2, cote_cadre_ext, cote_cadre_ext, 0xbbada0);
//
//     /* Création du tableau de stockage des variables */
//     this.carreaux = new Array(this.MESURES.NOMBRE_CARREAUX_COTE);
//     for (let i = 0; i < this.MESURES.NOMBRE_CARREAUX_COTE; i++) {
//       this.carreaux[i] = new Array(this.MESURES.NOMBRE_CARREAUX_COTE);
//     }
//     /* Création des carreaux */
//     let decalageX =
//       width / 2 - cote_cadre_int / 2 + this.MESURES.TAILLE_INTERSTICE + this.MESURES.TAILLE_CARREAUX / 2;
//     let decalageY =
//       height / 2 - cote_cadre_int / 2 + this.MESURES.TAILLE_INTERSTICE + this.MESURES.TAILLE_CARREAUX / 2;
//     for (let i = 0; i < this.MESURES.NOMBRE_CARREAUX_COTE; i++) {
//       for (let j = 0; j < this.MESURES.NOMBRE_CARREAUX_COTE; j++) {
//         let valeur = 0;
//
//         let fondB = this.add
//           .rectangle(
//             decalageX + j * (this.MESURES.TAILLE_INTERSTICE + this.MESURES.TAILLE_CARREAUX),
//             decalageY + i * (this.MESURES.TAILLE_INTERSTICE + this.MESURES.TAILLE_CARREAUX),
//             this.MESURES.TAILLE_CARREAUX,
//             this.MESURES.TAILLE_CARREAUX,
//             0xcdc1b4
//           )
//           .setScale(this.MESURES.ECHELLE_IMAGES);
//
//         let numAff = this.add
//           .text(
//             decalageX + j * (this.MESURES.TAILLE_INTERSTICE + this.MESURES.TAILLE_CARREAUX),
//             decalageY + i * (this.MESURES.TAILLE_INTERSTICE + this.MESURES.TAILLE_CARREAUX),
//             "",
//             { font: "bold 50px sans-serif", color: "black" }
//           )
//           .setOrigin(0.5, 0.5);
//         this.carreaux[i][j] = {
//           val: valeur,
//           fond: fondB,
//           num: numAff
//         };
//       }
//     }
//
//     this.apparitionValeur();
//     this.apparitionValeur();
//   }
//
//   update() {
//     if (Phaser.Input.Keyboard.JustDown(this.touches.haut)) {
//       console.log("haut");
//       this.glisserJeuHaut();
//     }
//     if (Phaser.Input.Keyboard.JustDown(this.touches.bas)) {
//       console.log("bas");
//       this.glisserJeuBas();
//     }
//     if (Phaser.Input.Keyboard.JustDown(this.touches.gauche)) {
//       console.log("gauche");
//       this.glisserJeuGauche();
//     }
//     if (Phaser.Input.Keyboard.JustDown(this.touches.droite)) {
//       console.log("droite");
//       this.glisserJeuDroite();
//     }
//     if (this.jeuGagne) {
//       console.log("Victoire !");
//       this.texteVictoire.setVisible(1);
//     } else if (this.jeuPerdu) {
//       console.log("Oh non");
//       this.chronoJeu.paused = true;
//       this.texteDefaite.setVisible(1);
//     }
//   }
//
//   glisserJeuDroite() {
//     for (let i = 0; i < this.MESURES.NOMBRE_CARREAUX_COTE; i++) {
//       for (let j = this.MESURES.NOMBRE_CARREAUX_COTE - 1; j >= 0; j--) {
//         if (this.carreaux[i][j].val === 0) {
//           for (let k = j - 1; k >= 0; k--) {
//             if (this.carreaux[i][k].val !== 0) {
//               this.actualiserTuile(this.carreaux[i][j], this.carreaux[i][k].val);
//               //console.log("modif1 en", i, j, this.carreaux[i][k].val);
//               this.actualiserTuile(this.carreaux[i][k], 0);
//               //console.log("modif2 en", i, k, 0);
//               break;
//             }
//           }
//         }
//         if (
//           this.dansLimites(i, j + 1) &&
//           this.carreaux[i][j].val !== 0 &&
//           this.carreaux[i][j].val === this.carreaux[i][j + 1].val
//         ) {
//           this.actualiserTuile(this.carreaux[i][j + 1], this.carreaux[i][j + 1].val + 1);
//           this.actualiserTuile(this.carreaux[i][j], 0);
//           j++;
//         }
//       }
//     }
//     this.apparitionValeur();
//     if (!this.peutBouger() && !this.jeuGagne) {
//       this.jeuPerdu = true;
//     }
//   }
//
//   glisserJeuGauche() {
//     for (let i = 0; i < this.MESURES.NOMBRE_CARREAUX_COTE; i++) {
//       for (let j = 0; j < this.MESURES.NOMBRE_CARREAUX_COTE; j++) {
//         if (this.carreaux[i][j].val === 0) {
//           for (let k = j; k < this.MESURES.NOMBRE_CARREAUX_COTE; k++) {
//             if (this.carreaux[i][k].val !== 0) {
//               this.actualiserTuile(this.carreaux[i][j], this.carreaux[i][k].val);
//               //console.log("modif1 en", i, j, this.carreaux[i][k].val);
//               this.actualiserTuile(this.carreaux[i][k], 0);
//               //console.log("modif2 en", i, k, 0);
//               break;
//             }
//           }
//         }
//         if (
//           this.carreaux[i][j].val !== 0 &&
//           this.dansLimites(i, j - 1) &&
//           this.carreaux[i][j].val === this.carreaux[i][j - 1].val
//         ) {
//           this.actualiserTuile(this.carreaux[i][j - 1], this.carreaux[i][j - 1].val + 1);
//           this.actualiserTuile(this.carreaux[i][j], 0);
//           j--;
//         }
//       }
//     }
//     this.apparitionValeur();
//     if (!this.peutBouger() && !this.jeuGagne) {
//       this.jeuPerdu = true;
//     }
//   }
//
//   glisserJeuHaut() {
//     for (let i = 0; i < this.MESURES.NOMBRE_CARREAUX_COTE; i++) {
//       for (let j = 0; j < this.MESURES.NOMBRE_CARREAUX_COTE; j++) {
//         if (this.carreaux[j][i].val === 0) {
//           for (let k = j; k < this.MESURES.NOMBRE_CARREAUX_COTE; k++) {
//             if (this.carreaux[k][i].val !== 0) {
//               this.actualiserTuile(this.carreaux[j][i], this.carreaux[k][i].val);
//               //console.log("modif1 en", j, i, this.carreaux[k][i].val);
//               this.actualiserTuile(this.carreaux[k][i], 0);
//               //console.log("modif2 en", k, i, 0);
//               break;
//             }
//           }
//         }
//         if (
//           this.dansLimites(i, j - 1) &&
//           this.carreaux[j][i].val !== 0 &&
//           this.carreaux[j][i].val === this.carreaux[j - 1][i].val
//         ) {
//           this.actualiserTuile(this.carreaux[j - 1][i], this.carreaux[j - 1][i].val + 1);
//           this.actualiserTuile(this.carreaux[j][i], 0);
//           j--;
//         }
//       }
//     }
//     this.apparitionValeur();
//     if (!this.peutBouger() && !this.jeuGagne) {
//       this.jeuPerdu = true;
//     }
//   }
//
//   glisserJeuBas() {
//     for (let i = 0; i < this.MESURES.NOMBRE_CARREAUX_COTE; i++) {
//       for (let j = this.MESURES.NOMBRE_CARREAUX_COTE - 1; j >= 0; j--) {
//         if (this.carreaux[j][i].val === 0) {
//           for (let k = j - 1; k >= 0; k--) {
//             if (this.carreaux[k][i].val !== 0) {
//               this.actualiserTuile(this.carreaux[j][i], this.carreaux[k][i].val);
//               //console.log("modif1 en", j, i, this.carreaux[k][i].val);
//               this.actualiserTuile(this.carreaux[k][i], 0);
//               //console.log("modif2 en", k, i, 0);
//               break;
//             }
//           }
//         }
//         if (
//           this.dansLimites(i, j + 1) &&
//           this.carreaux[j][i].val !== 0 &&
//           this.carreaux[j][i].val === this.carreaux[j + 1][i].val
//         ) {
//           this.actualiserTuile(this.carreaux[j + 1][i], this.carreaux[j + 1][i].val + 1);
//           this.actualiserTuile(this.carreaux[j][i], 0);
//           j++;
//         }
//       }
//     }
//     this.apparitionValeur();
//     if (!this.peutBouger() && !this.jeuGagne) {
//       this.jeuPerdu = true;
//     }
//   }
//
//   dansLimites(x, y) {
//     return x >= 0 && x < this.MESURES.NOMBRE_CARREAUX_COTE && y >= 0 && y < this.MESURES.NOMBRE_CARREAUX_COTE;
//   }
//
//   apparitionValeur() {
//     let tab = this.carreauxVides();
//     if (tab.length === 0) return;
//     let tirage = Phaser.Math.Between(0, tab.length - 1);
//     let valeur = Phaser.Math.Between(1, 2);
//     this.actualiserTuile(tab[tirage], valeur);
//     //console.log("On prend la valeur " + valeur + " en " + tirage);
//     //tab[tirage].num.setColor("teal");
//   }
//
//   carreauxVides() {
//     let tab = [];
//
//     for (let i = 0; i < this.MESURES.NOMBRE_CARREAUX_COTE; i++) {
//       for (let j = 0; j < this.MESURES.NOMBRE_CARREAUX_COTE; j++) {
//         if (this.carreaux[i][j].val === 0) {
//           tab.push(this.carreaux[i][j]);
//         }
//       }
//     }
//
//     return tab;
//   }
//
//   actualiserTuile(tuile, valeur) {
//     tuile.val = Math.min(valeur, this.couleursTemp.length - 1);
//     tuile.fond.setFillStyle(this.couleursTemp[valeur]);
//     if (valeur === 0) {
//       tuile.num.setText("");
//     } else {
//       tuile.num.setText((2 ** valeur).toString());
//     }
//     if (valeur > 2) {
//       tuile.num.setColor("white");
//     } else {
//       tuile.num.setColor("black");
//     }
//     if (valeur === 9) {
//       /* Le jeu est gangé quand on atteint 512 */
//       this.jeuGagne = true;
//     }
//   }
//
//   peutBouger() {
//     for (let i = 0; i < this.MESURES.NOMBRE_CARREAUX_COTE; i++) {
//       for (let j = 0; j < this.MESURES.NOMBRE_CARREAUX_COTE; j++) {
//         if (this.carreaux[i][j].val === 0) {
//           return true;
//         } else {
//           if (this.dansLimites(i, j + 1) && this.carreaux[i][j].val === this.carreaux[i][j + 1].val) {
//             return true;
//           }
//           if (this.dansLimites(i, j - 1) && this.carreaux[i][j].val === this.carreaux[i][j - 1].val) {
//             return true;
//           }
//           if (this.dansLimites(i + 1, j) && this.carreaux[i][j].val === this.carreaux[i + 1][j].val) {
//             return true;
//           }
//           if (this.dansLimites(i - 1, j) && this.carreaux[i][j].val === this.carreaux[i - 1][j].val) {
//             return true;
//           }
//         }
//       }
//     }
//     return false;
//   }
//
//   avancerChrono() {
//     this.chrono++;
//     let min = Math.floor(this.chrono / 60);
//     let sec = this.chrono % 60;
//     /* On veut toujours afficher au format MM:SS, et pas M:SS */
//     this.texteChrono.setText(min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0"));
//   }
// }
