const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Character, Episode } = require("../db");

// Configurar los routers
const getApiInfo = async () => {
  const apiUrl = await axios.get("https://rickandmortyapi.com/api/character");
  const infoApi = await apiUrl.data.results.map((e) => {
    return {
      id:e.id,
      name: e.name,
      origin: e.origin.name,
      species: e.species,
      image: e.image,
      episode: e.episode,
    };
  });

  return infoApi;
};
const getDbCharacter = async () => {
  return await Character.findAll({
    include: {
      model: Episode,
      attributes: ['name'],
      through: {
        attributes:[]
      }
    }
  });
};

const getAllCharacter = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbCharacter();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};
router.get("/character", async (req, res) => {
  const info = await getAllCharacter();
  //console.log(apiInfo.map(e=>e.species))
  try {
    info.length
      ? res.status(200).json(info)
      : res.status(400).send("Data not found");
  } catch (error) {
    console.log(error);
  }
});

router.get("/episode", async (req, res) => {
  try {
    const apiEpisodes = await axios.get(
      "https://rickandmortyapi.com/api/episode"
    );
    const episodes = apiEpisodes.data.results;
    episodeForEach = episodes.forEach((el) => {
      Episode.findOrCreate({
        where: { name: el.name, id: el.id },
      });
    });
    const allEpisodes = await Episode.findAll();
    console.log(allEpisodes, "CARGADO EN BASE DE DATOS");
    res.send(allEpisodes);
  } catch (error) {
    console.log(error);
  }
});

router.post("/character", async (req, res) => {
  const { name, origin, species, image,episode } = req.body;
  try {
    let characterCreate = await Character.create({
      name,
      origin,
      species,
      image,
    });
    let episodeDb = await Episode.findAll({
      where: { name: episode }
    });
    console.log(episodeDb)
    characterCreate.addEpisode(episodeDb);
    res.status(200).send("Character created succesfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/character/:id", async (req, res) => {
  const { id } = req.params;
  const allCharacters = await getAllCharacter();
  const validate = id.includes("-");
  if (validate) {
    try {
      let db = await Character.findByPk(id)
      res.status(200).json(db);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      if (id) {
        let characterById = await allCharacters.filter(
          (e) => e.id === parseInt(id)
        );
        characterById.length
          ? res.status(200).send(characterById)
          : res.status(400).send("character not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
});
module.exports = router;
