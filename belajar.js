const cheerio = require('cheerio');

async function Calon_Presiden_Indo() {
  try {
    let resp = await fetch('https://news.detik.com/pemilu/quickcount');
    let html = await resp.text();
    let $ = cheerio.load(html);
    let result = {
      title: $('h4').text(),
      capres_info: [],
      data_sementara: []
    };

    $('.data-survei__item-paslon img').each(function() {
      let img = $(this).attr('src');
      let paslon = $(this).attr('alt');
      result.capres_info.push({ paslon, img });
    });

    $('.data-survei__item').each(function() {
      let imgSrc = $(this).find('.data-survei__item-logo').attr('src');
      let imgAlt = $(this).find('.data-survei__item-logo').attr('alt');
      let abah_anis = $(this).find('.progress--1 .quickcount__calc').text();
      let prabowo = $(this).find('.progress--2 .quickcount__calc').text();
      let ganjar = $(this).find('.progress--3 .quickcount__calc').text();
      let dataPer = $(this).find('.data-survei__item-info span.color-blue').eq(0).text();
      let suaraMasuk = $(this).find('.data-survei__item-info span.color-blue').eq(1).text();
      result.data_sementara.push({
        logo: imgSrc,
        from: imgAlt,
        progres: {
          abah_anis: abah_anis,
          prabowo: prabowo,
          ganjar: ganjar
        },
        data_per: dataPer,
        suara_masuk: suaraMasuk
      });
    });
    return result;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  Calon_Presiden_Indo
}