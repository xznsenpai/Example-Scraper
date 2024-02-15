const cheerio = require('cheerio');

async function Calon_Presiden_Indo() {
  try {
    let resp = await fetch('https://news.detik.com/pemilu/quickcount');
    let html = await resp.text();
    let $ = cheerio.load(html);
    let result = {
      title: $('title').text(),
      paslon_info: [],
      count_sementara: [],
      disclaimer: '*) Hasil hitung cepat bukanlah hasil resmi pemilu. Hasil resmi pemilu tetap menunggu perhitungan suara secara manual dari KPU'
    };

    $('.data-survei__item-paslon img').each(function() {
      let img = $(this).attr('src');
      let paslon = $(this).attr('alt');
      result.paslon_info.push({ paslon, img });
    });

    $('.data-survei__item').each(function() {
      let imgSrc = $(this).find('.data-survei__item-logo').attr('src');
      let imgAlt = $(this).find('.data-survei__item-logo').attr('alt');
      let paslon1 = $(this).find('.progress--1 .quickcount__calc').text();
      let paslon2 = $(this).find('.progress--2 .quickcount__calc').text();
      let paslon3 = $(this).find('.progress--3 .quickcount__calc').text();
      let dataPer = $(this).find('.data-survei__item-info span.color-blue').eq(0).text();
      let suaraMasuk = $(this).find('.data-survei__item-info span.color-blue').eq(1).text();
      result.count_sementara.push({
        logo: imgSrc,
        from: imgAlt,
        data_per: dataPer,
        progres: {
          Anies_Baswedan: paslon1,
          Prabowo_Subianto: paslon2,
          Ganjar_Pranowo: paslon3
        },
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