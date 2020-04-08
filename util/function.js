function getTime (date) 
{
  return new Date(date).getTime();
} 

module.exports = {
  streakSort,
}

  function streakSort(actor) {
    // let sortedActorArr = dateSort(actor)
    return formatResult(streakOrder(dateSort(actor)));
  }

  function dateSort (arr) {
    const result = arr.sort((s1, s2) => {
      if (s1.login === s2.login) {
        const s1time = getTime(s1.created_at)
        const s2time = getTime(s2.created_at)
        return s2time - s1time;
      }
      return s1.login.localeCompare(s2.login)
    })

    return result;
  }


  function formatResult(arr) {
    for(let i = 0; i < arr.length; i++) {
    delete arr[i].streak
    delete arr[i].created_at
    }

    return arr;
  }


  function streakOrder(arr) {
  const d = arr;
  const actorEvents = [];
  let count = 0;

  const aDayInMilsec = (1000 * 3600 * 24)
  const day = 86400000

  for (let i = 0; d.length > i; i++) {
    if (d.length - 1 == i) {
      d[i].streak = count
      actorEvents.push(d[i])
      break;
    }
    if (d[i].login === d[i + 1].login) {
      const dafirst = d[i].created_at.split(' ')[0];
      const dbfirst = d[i + 1].created_at.split(' ')[0];
      const datime = getTime(dafirst);
      const dbtime = getTime(dbfirst);


      let dif_in_days;
      let dif_in_time;
      if (Number(datime) > Number(dbtime)) {
        dif_in_time = datime - dbtime;

      } else if (Number(dbtime) > Number(datime)) {
        const temp1 = d[i]
        const temp2 = d[i + 1]
        d[i] = temp2
        d[i + 1] = temp1
        dif_in_time = dbtime - datime;
      } else {
        dif_in_time = dbtime - datime;
      }
      dif_in_days = dif_in_time / aDayInMilsec;

      if (dif_in_days === 1) {
        const dacaltime = getTime(d[i].created_at);
        const dbcaltime = getTime(d[i + 1].created_at);

        const timeDiff = dacaltime + day;
        if (Number(timeDiff) > Number(dbcaltime)) {
          count++
        }
      }
      const temp1 = d[i]
      const temp2 = d[i + 1]
      d[i] = temp2
      d[i + 1] = temp1
    } else {
      d[i].streak = count
      actorEvents.push(d[i])
      count = 0;
    }
  }

  let result = actorEvents.sort((s1, s2) => {
    if (s1.streak === s2.streak) {
      const s1time = getTime(s1.created_at)
      const s2time = getTime(s2.created_at)
      if (s1time === s2time) {
        return s1.login.localeCompare(s2.login);
      }
      return s2time - s1time
    }

    return s2.streak - s1.streak
  });
  const arrInd = []

  for (let i = 0; i < result.length; i++) {
    if (result.length - 1 == i) {
      break;
    }
    if (result[i].login === result[i + 1].login) {
      arrInd.push(i)
    }
  }
  for (let i = 0; i < arrInd.length; i++) {
    result.splice(arrInd[i], 1)
  }

  return result
  }
