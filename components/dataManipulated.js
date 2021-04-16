import { active } from "./calculateActive";

//Function that returns state object with total values and data
export const getStateObj = (obj) => {
  if (obj.delta == undefined) {
    return {
      confirmed: obj.total.confirmed,
      recovered: obj.total.recovered,
      deceased: obj.total.deceased,
      tested: obj.total.tested,
      vaccinated: obj.total.vaccinated,
      population: obj.meta.population,
      lastupdated: obj.meta.last_updated,
      active: active(
        obj.total.confirmed,
        obj.total.recovered,
        obj.total.deceased,
        obj.total.other
      ),
      other: obj.total.other,
    };
  } else {
    return {
      confirmed: obj.total.confirmed,
      recovered: obj.total.recovered,
      deceased: obj.total.deceased,
      tested: obj.total.tested,
      vaccinated: obj.total.vaccinated,
      population: obj.meta.population,
      lastupdated: obj.meta.last_updated,
      active: active(
        obj.total.confirmed,
        obj.total.recovered,
        obj.total.deceased,
        obj.total.other
      ),
      other: obj.total.other,
      delta: obj.delta,
    };
  }
};

//Function that returns single district related all the values
export const getdistobj = (obj, name) => {
  var distlist = obj.districts;
  var filter = Object.entries(distlist).find(([key, value]) => key == name);
  var districtObj = {};
  var population;
  var lastupdated;
  if (filter[1].meta != undefined) {
    console.log(filter[1]);
    lastupdated =
      filter[1].meta.last_updated != undefined
        ? filter[1].meta.last_updated
        : "-";
    population =
      filter[1].meta.population != undefined ? filter[1].meta.population : "-";
  } else {
    population = "-";
    lastupdated = "-";
  }
  var vacc;
  if (name == "Delhi" || name == "Chandigarh") {
    vacc = obj.total.vaccinated;
  } else {
    vacc = filter[1].total.vaccinated;
  }
  districtObj = () => {
    if (filter[1].delta == undefined) {
      return {
        district: filter[0],
        confirmed: filter[1].total.confirmed,
        recovered: filter[1].total.recovered,
        deceased: filter[1].total.deceased,
        tested: filter[1].total.tested,
        lastupdated: lastupdated,
        vaccinated: vacc,
        active: active(
          filter[1].total.confirmed,
          filter[1].total.recovered,
          filter[1].total.deceased,
          filter[1].total.other
        ),
        other: filter[1].total.other,
        population: population,
      };
    } else {
      return {
        district: filter[0],
        confirmed: filter[1].total.confirmed,
        recovered: filter[1].total.recovered,
        deceased: filter[1].total.deceased,
        tested: filter[1].total.tested,
        lastupdated: lastupdated,
        vaccinated: vacc,
        active: active(
          filter[1].total.confirmed,
          filter[1].total.recovered,
          filter[1].total.deceased,
          filter[1].total.other
        ),
        other: filter[1].total.other,
        population: population,
        delta: filter[1].delta,
      };
    }
  };
  return districtObj;
};

//Function that returns a list of all district data relating to a state
export const distinfo = (obj) => {
  var distlist = obj.districts;
  var districtlist = [];
  districtlist = Object.entries(distlist).map(([key, value]) => {
    var population;
    if (value.meta != undefined) {
      population =
        value.meta.population != undefined ? value.meta.population : "-";
    } else {
      population = "-";
    }
    var vacc;
    if (key == "Delhi" || key == "Chandigarh") {
      console.log("yo");
      vacc = obj.total.vaccinated;
    } else {
      vacc = value.total.vaccinated;
    }
    if (value.delta == undefined) {
      return {
        district: key,
        population: population,
        confirmed: value.total.confirmed,
        recovered: value.total.recovered,
        deceased: value.total.deceased,
        tested: value.total.tested,
        vaccinated: vacc,
        active: active(
          value.total.confirmed,
          value.total.recovered,
          value.total.deceased,
          value.total.other
        ),
        other: value.total.other,
      };
    } else {
      return {
        district: key,
        confirmed: value.total.confirmed,
        recovered: value.total.recovered,
        deceased: value.total.deceased,
        tested: value.total.tested,
        vaccinated: vacc,
        active: active(
          value.total.confirmed,
          value.total.recovered,
          value.total.deceased,
          value.total.other
        ),
        other: value.total.other,
        population: population,
        delta: value.delta,
      };
    }
  });
  return districtlist;
};
