let root = "https://api.github.com"
let proxy = "https://cors.snek.at/"
let talks = []
let source = {
  username : "pinterid",
  organizations : ["Infineon"],
}

async function getJSON (path) {
  return fetch(proxy + root + path,{
    headers: {
      "x-requested-with": "XMLHttpRequest",
      accept: "application/json, text/plain, ",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json();
  })
}

async function pathProvider (source) {
  let page = 1;
  let path = `/search/code?q=user:${source.username} in:file extension:pdf&page=${page}`;
  let obj = await getJSON(path);
  let objList = obj.items;
  while (objList.length < obj.total_count){
    page += 1;
    path = `/search/code?q=user:${source.username} in:file extension:pdf&page=${page}`;
    obj = await getJSON(path);
    obj.items.forEach(item => {
      objList.push(item);
    })
  }
  addToTalks(objList);

  for (let index in source.organizations) {
    page = 1;
    let org = source.organizations[index];
    let path = `/search/code?q=org:${org} in:file extension:pdf&page=${page}`;
    let obj = await getJSON(path);
    let objList = obj.items;
    while (objList.length < obj.total_count){
      page += 1;
      path = `/search/code?q=org:${org} in:file extension:pdf&page=${page}`;
      obj = await getJSON(path);
      obj.items.forEach(item => {
        objList.push(item);
      })
    }
    addToTalks(objList);
  }
}

async function addToTalks (obj) {
  obj.forEach(item => {
    let talk = {
      name: item.name,
      url: item.html_url.replace("/blob/", "/raw/"),
      path: item.path,
      repository: {
        name: item.repository.name,
        fullName: item.repository.full_name,
        url: item.repository.html_url,
        avatarUrl: item.repository.owner.avatar_url,
      },
    }
    talks.push(talk);
  });
}

pathProvider(source).then(() => {
  console.log(talks);
});

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */