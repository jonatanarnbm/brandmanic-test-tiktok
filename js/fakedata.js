export const queryUserInfoResponse = {
  open_id: "1",
  union_id: "2",
  avatar_url: "http://...",
  avatar_url100: "http://...",
  avatar_large_url: "http://...",
  display_name: "Toñito",
  bio_description: "El mejor Toñito de calle 🔥🔥",
  profile_deep_link: "http://...",
  is_verified: "1",
  follower_count: "1234",
  following_count: "1234",
  likes_count: "54321",
  video_count: "98765",
};
export const queryVideosResponse = {
  data: {
    videos: [
      {
        id: "1525212512552215125152125",
        create_time: "2020102131-123030",
        cover_image_url:
          "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798",
        share_url:
          "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798",
        video_description:
          "Lorem fistrum ese pedazo de está la cosa muy malar a gramenawer a gramenawer va usté muy cargadoo al ataquerl ese pedazo de mamaar por la gloria de mi madre ese hombree.",
        duration: "1234123412345678567",
        height: "1920",
        width: "1080",
        title: "De fiesta con Toñito 🥵🥵",
        embed_html:
          "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798/",
        embed_link:
          "https://www.tiktok.com/127892171937912378192387219872/19781237892138/71923782198719821798/",
        like_count: "1234123412345678567",
        commnent_count: "515421",
        share_count: "835",
        view_count: "6121341",
      },
      {
        id: "1525212512552215125152125",
        create_time: "2020102131-123030",
        cover_image_url:
          "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798",
        share_url:
          "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798",
        video_description:
          "Lorem fistrum ese pedazo de está la cosa muy malar a gramenawer a gramenawer va usté muy cargadoo al ataquerl ese pedazo de mamaar por la gloria de mi madre ese hombree.",
        duration: "1234123412345678567",
        height: "1920",
        width: "1080",
        title: "De fiesta con Toñito 🥵🥵",
        embed_html:
          "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798/",
        embed_link:
          "https://www.tiktok.com/127892171937912378192387219872/19781237892138/71923782198719821798/",
        like_count: "1234123412345678567",
        commnent_count: "515421",
        share_count: "835",
        view_count: "6121341",
      },
    ],
  },
  error: {
    code: "ok",
    message: "",
    log_id: "20220829194722CBE87ED59D524E727021",
  },
};

export const queryAdsResponse = {
  data: {
    ads: [
      {
        ad: {
          first_shown_date: 20210101,
          id: 1,
          image_urls: [
            "https://asdfcdn.com/17392712.jpeg?x-expires=1679169600\u0026x-signature=asdf",
          ],
          last_shown_date: 20210101,
          status: "active",
          videos: [
            {
              url: "https://asdfcdn.com/..../127364jmdfjsa93d8cn30dm2di/?mime_type=video_mp4",
            },
            {
              url: "https://asdfcdn.com/..../1kmeidhfb38u21nd82hsk389fd/?mime_type=video_mp4",
            },
          ],
          reach: {
            unique_user_seen: "11K",
          },
        },
        advertiser: {
          buisness_id: 3847236290405,
          business_name: "Awe Food Co.",
          paid_by: "Awe Co.",
        },
      },
      {
        ad: {
          first_shown_date: 20210101,
          id: 2,
          image_urls: [
            "https://asdfcdn.com/17392712.jpeg?x-expires=1679169600\u0026x-signature=asdf",
          ],
          last_shown_date: 20210101,
          status: "active",
          videos: [
            {
              url: "https://asdfcdn.com/..../127364jmdfjsa93d8cn30dm2di/?mime_type=video_mp4",
            },
            {
              url: "https://asdfcdn.com/..../1kmeidhfb38u21nd82hsk389fd/?mime_type=video_mp4",
            },
          ],
          reach: {
            unique_user_seen: "11K",
          },
        },
        advertiser: {
          buisness_id: 3847236290405,
          business_name: "Awe Food Co.",
          paid_by: "Awe Co.",
        },
      },
    ],
    has_more: "true",
    search_id: "2837438294054038",
  },
  error: {
    code: "ok",
    http_status_code: 200,
    log_id: "202304280326050102231031430C7E754E",
    message: "",
  },
};
export const queryAdvertisersResponse = {
  data: {
    advertisers: [
      {
        business_id: 1755645247067185,
        business_name: "Awesome Food Co.",
        country_code: "US",
      },
      {
        business_id: 183746395837294,
        business_name: "Awesome Drink Co.",
        country_code: "CA",
      },
    ],
  },
  error: {
    code: "ok",
    http_status_code: 200,
    log_id: "202207280326050102231031430C7E754E",
    message: "",
  },
};

export const queryAdDetailResponse = {
  data: {
    ad: {
      first_shown_date: 20210101,
      id: 1923845247192304,
      image_urls: [
        "https://111.com/17392712.jpeg?x-expires=1679169600\u0026x-signature=asdf",
        "https://2222.com/17392712.jpeg?x-expires=1679169600\u0026x-signature=asdf",
      ],
      last_shown_date: 20210101,
      status: "active",
      videos: [
        {
          url: "https://asdfcdn.com/..../127364jmdfjsa93d8cn30dm2di/?mime_type=video_mp4",
        },
        {
          url: "https://asdfcdn.com/..../1kmeidhfb38u21nd82hsk389fd/?mime_type=video_mp4",
        },
      ],
      reach: {
        unique_users_seen: "30K",
        unique_users_seen_by_country: {
          GB: "18K",
          IT: "12K",
        },
      },
    },
    ad_group: {
      target: {
        number_of_users_targeted: "50K",
        country: ["IT", "GB"],
        age: {
          "13-17": false,
          "18-24": false,
          "25-34": false,
          "35-44": true,
          "35-44": true,
          "55+": true,
        },
        gender: {
          female: true,
          male: true,
          other_genders: true,
        },
        audience_targeting: "No",
        video_interactions: "Entertainment",
        creator_interactions: "Talent",
        interest: "News & Entertainment, Business Services",
      },
    },
    advertiser: {
      business_id: 1755645247067185,
      business_name: "Awesome Co.",
      country_code: "US",
      paid_by: "Awesome Co.",
      tiktok_account: {
        avatar_url:
          "https://asdf.tiktokcdn.com/1736254.jpeg?x-expires=1679169600\u0026x-signature=asdf",
        follower_count: 26374,
        profile_url: "https://www.tiktok.com/@awesome_co",
      },
    },
  },
  error: {
    code: "ok",
    http_status_code: 200,
    log_id: "202207280326050102231031430C7E754E",
    message: "",
  },
};
export const queryAdReportResponse = {
  data: {
    count_time_series_by_country: {
      IT: [
        { date: "20210109", count: 45 },
        { date: "20210108", count: 24 },
      ],
      ES: [
        { date: "20210109", count: 48 },
        { date: "20210108", count: 22 },
      ],
    },
  },
  error: {
    code: "ok",
    http_status_code: 200,
    log_id: "202207280326050102231031430C7E754E",
    message: "",
  },
};
export const queryCommercialContentResponse = {
  data: {
    commercial_contents: [
      {
        brand_names: ["My Awesome Co.", "HelloWorld Inc."],
        create_date: "20230109",
        create_timestamp: 1696875852,
        creator: {
          username: "joe1234567",
        },
        id: "v09044g40000ce6enu3c77u36l73sp20",
        label: "Paid partnership",
        videos: [
          {
            id: 1,
            status: true,
            cover_image_url:
              "https://asdfcdn.com/17392712.jpeg?x-expires=1679169600\u0026x-signature=asdf",
            url: "https://www.tiktok.com/@joe1234567/video/19384729204821234",
          },
          {
            id: 2,
            status: true,
            cover_image_url:
              "https://asdfcdn.com/17392712.jpeg?x-expires=1679169600\u0026x-signature=asdf",
            url: "https://www.tiktok.com/@joe1234567/video/19384729204821234",
          },
          {
            id: 3,
            status: false,
            cover_image_url:
              "https://asdfcdn.com/17392712.jpeg?x-expires=1679169600\u0026x-signature=asdf",
            url: "https://www.tiktok.com/@joe1234567/video/19384729204821234",
          },
        ],
      },
    ],
    has_more: "true",
    search_id: "2837438294054038",
  },
  error: {
    code: "ok",
    http_status_code: 200,
    log_id: "202207280326050102231031430C7E754E",
    message: "",
  },
};
