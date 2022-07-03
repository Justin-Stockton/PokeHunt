"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */
    return queryInterface.bulkInsert(
      "Pokemons",
      [
        {
          userId: 1,
          name: "Ashe's Pikachu",
          imgUrl:
            "https://archives.bulbagarden.net/media/upload/thumb/archive/1/17/20170907183925%21025Pikachu-Original.png/120px-025Pikachu-Original.png",
          description:
            "He might not be the coolest Pokemon, but he is my best friend. I can't imagine becoming a pokemon master without him by my side!",
        },
        {
          userId: 2,
          name: "Bulbasaur",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/1.svg",
          description:
            "Bulbasaur (Japanese: フシギダネ Fushigidane) is a dual-type Grass/Poison Pokémon introduced in Generation I. It evolves into Ivysaur starting at level 16, which evolves into Venusaur starting at level 32. Along with Charmander and Squirtle, Bulbasaur is one of three starter Pokémon of Kanto available at the beginning of Pokémon Red, Green, Blue, FireRed, and LeafGreen.",
        },
        {
          userId: 2,
          name: "Ivysaur",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/2.svg",
          description:
            "Ivysaur (Japanese: フシギソウ Fushigisou) is a dual-type Grass/Poison Pokémon introduced in Generation I. It evolves from Bulbasaur starting at level 16 and evolves into Venusaur starting at level 32.",
        },
        {
          userId: 2,
          name: "Venusaur",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/3.svg",
          description:
            "Venusaur (Japanese: フシギバナ Fushigibana) is a dual-type Grass/Poison Pokémon introduced in Generation I. It evolves from Ivysaur starting at level 32. It is the final form of Bulbasaur. Venusaur has two other forms. It can Mega Evolve into Mega Venusaur using the Venusaurite. It has a Gigantamax form that was introduced in The Isle of Armor. Venusaur is the game mascot of both Pokémon Green and LeafGreen, appearing on the box art of both.",
        },
        {
          userId: 2,
          name: "Charmander",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/4.svg",
          description:
            "Charmander (Japanese: ヒトカゲ Hitokage) is a Fire-type Pokémon introduced in Generation I. It evolves into Charmeleon starting at level 16, which evolves into Charizard starting at level 36. Along with Bulbasaur and Squirtle, Charmander is one of three starter Pokémon of Kanto available at the beginning of Pokémon Red, Green, Blue, FireRed, and LeafGreen.",
        },
        {
          userId: 2,
          name: "Charmeleon",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/5.svg",
          description:
            "Charmeleon (Japanese: リザード Lizardo) is a Fire-type Pokémon introduced in Generation I. It evolves from Charmander starting at level 16 and evolves into Charizard starting at level 36.",
        },
        {
          userId: 2,
          name: "Charizard",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/6.svg",
          description:
            "Charizard (Japanese: リザードン Lizardon) is a dual-type Fire/Flying Pokémon introduced in Generation I. It evolves from Charmeleon starting at level 36. It is the final form of Charmander. Charizard has three other forms. It can Mega Evolve into two forms: Mega Charizard X using Charizardite X. Mega Charizard Y using Charizardite Y. It has a Gigantamax form. Charizard is the game mascot of both Pokémon Red and FireRed Versions.",
        },
        {
          userId: 2,
          name: "Squirtle",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/7.svg",
          description:
            "Squirtle (Japanese: ゼニガメ Zenigame) is a Water-type Pokémon introduced in Generation I. It evolves into Wartortle starting at level 16, which evolves into Blastoise starting at level 36. Along with Bulbasaur and Charmander, Squirtle is one of three starter Pokémon of Kanto available at the beginning of Pokémon Red, Green, Blue, FireRed, and LeafGreen.",
        },
        {
          userId: 2,
          name: "Wartortle",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/8.svg",
          description:
            "Wartortle (Japanese: カメール Kameil) is a Water-type Pokémon introduced in Generation I. It evolves from Squirtle starting at level 16 and evolves into Blastoise starting at level 36.",
        },
        {
          userId: 2,
          name: "Blastoise",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/9.svg",
          description:
            "It evolves from Wartortle starting at level 36. It is the final form of Squirtle. Blastoise has two other forms. It can Mega Evolve into Mega Blastoise using the Blastoisinite. It has a Gigantamax form that was introduced in The Isle of Armor. Blastoise is the game mascot of the Japanese and international versions of Pokémon Blue, appearing on the boxart of both.",
        },
        {
          userId: 2,
          name: "Jolteon",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/135.svg",
          description:
            "Jolteon (Japanese: サンダース Thunders) is an Electric-type Pokémon introduced in Generation I. It evolves from Eevee when exposed to a Thunder Stone. It is one of Eevee's final forms, the others being Vaporeon, Flareon, Espeon, Umbreon, Leafeon, Glaceon, and Sylveon.",
        },
        {
          userId: 2,
          name: "Lapras",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/131.svg",
          description:
            "Lapras (Japanese: ラプラス Laplace) is a dual-type Water/Ice Pokémon introduced in Generation I. While it is not known to evolve into or from any other Pokémon, Lapras has a Gigantamax form.",
        },
        {
          userId: 2,
          name: "Mewtwo",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/150.svg",
          description:
            "While it is not known to evolve into or from any other Pokémon, Mewtwo can Mega Evolve into two different forms: Mega Mewtwo X using Mewtwonite X. Mega Mewtwo Y using Mewtwonite Y. It is a member of the Mew duo along with Mew.",
        },
        {
          userId: 2,
          name: "Onix",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/95.svg",
          description:
            "Onix (Japanese: イワーク Iwark) is a dual-type Rock/Ground Pokémon introduced in Generation I. It evolves into Steelix when traded while holding a Metal Coat. In Pokémon Legends: Arceus, however, it evolves when exposed to a Metal Coat.",
        },
        {
          userId: 2,
          name: "Gengar",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/94.svg",
          description:
            "Gengar (Japanese: ゲンガー Gangar) is a dual-type Ghost/Poison Pokémon introduced in Generation I. It evolves from Haunter when traded, or when exposed to a Linking Cord (Pokémon Legends: Arceus). It is the final form of Gastly. Gengar has two other forms. It can Mega Evolve into Mega Gengar using the Gengarite. It has a Gigantamax form.",
        },
        {
          userId: 2,
          name: "Jigglypuff",
          imgUrl:
            "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/39.svg",
          description:
            "Jigglypuff (Japanese: プリン Purin) is a dual-type Normal/Fairy Pokémon introduced in Generation I. Prior to Generation VI, it was a pure Normal-type Pokémon. It evolves from Igglybuff when leveled up with high friendship and evolves into Wigglytuff when exposed to a Moon Stone.",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Pokemon", null, {});
  },
};
