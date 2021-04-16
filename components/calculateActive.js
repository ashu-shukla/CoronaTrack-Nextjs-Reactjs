export const active = (confirm, recvr, death, other) => {
  var o = other ? other : 0;
  var d = death ? death : 0;
  return confirm - recvr - d - o;
};
