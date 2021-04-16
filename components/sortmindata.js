import states from "../public/statenames.json";
export const sortmindata = (mindata) => {
  var sortlist = [];
  var unsortedlist = [];
  var stateobj = {};
  unsortedlist = Object.entries(mindata).map(([key, value]) => {
    stateobj = states.find((state) => state.state_code == key);
    return {
      key: key,
      confirm: value.total.confirmed,
      name: stateobj.state_name,
    };
  });
  sortlist = unsortedlist.sort(function (a, b) {
    return a.confirm - b.confirm;
  });

  return sortlist.reverse();
};
