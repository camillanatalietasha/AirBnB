'use strict';

/** @type {import('sequelize-cli').Migration} */

// options object
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        hostId: 3,
        address: "123 Treehouse Way",
        city: "Lyons",
        state: "Colorado",
        country: "United States",
        lat: 40.210831,
        lng: -105.286264,
        name: "Lyons Mountain Treehouse",
        description:
          "Ut illo quos et ullam dolor sed animi amet et magni quia eos eligendi eligendi aut repellat ullam. Et voluptatem saepe sed suscipit accusamus est velit inventore aut quisquam voluptas aut similique tempore ea quidem totam. \n Eum dicta voluptatibus non tempore rerum 33 earum expedita ex praesentium libero eos temporibus nemo At accusantium fugiat? Sed odit incidunt qui iure internos ab nulla magnam et facere minus aut quia internos!",
        nightlyRate: 125,
        cleaningFee: 300,
      },
      {
        hostId: 4,
        address: "54 W 88th St",
        city: "New York",
        state: "New York",
        country: "United States",
        lat: 40.787411,
        lng: -73.970700,
        name: "Chic Upper West Side Flat",
        description:
          "Vel sapiente dolor hic dolorem adipisci et velit neque. Aut reprehenderit molestias a laboriosam quia sed laborum perspiciatis sit quos sequi!!! Sed sunt quia ea voluptatem quae eos possimus aperiam non blanditiis placeat a sequi iure eum asperiores debitis. \n Non veritatis dolores est enim fuga rem molestiae quia cum eaque quisquam sed perferendis atque et harum consequuntur aut laborum eveniet. Aut quia dolorem sed dolore quasi a dolore maxime qui similique nihil id perspiciatis similique. Sed vero quidem vel dicta eius id nihil incidunt et veniam optio et velit delectus! Et voluptatem velit non maiores voluptas ea tempore rerum eos autem maxime et dolor deserunt rem officiis consequatur eos culpa maiores.",
        nightlyRate: 500,
        cleaningFee: 450,
      },
      {
        hostId: 2,
        address: "555 Torrey Pines Road",
        city: "San Diego",
        state: "California",
        country: "United States",
        lat: 32.830628,
        lng: -117.279604,
        name: "Beachfront in La Jolla",
        description:
          "Rem tempora eveniet et atque voluptatum vel commodi quia. Aut enim recusandae ad deserunt necessitatibus qui praesentium voluptatem est reiciendis praesentium. Sed obcaecati iste et quas accusamus et sunt soluta sed facere enim et repudiandae Quis ab alias optio. \n Ex dignissimos natus eum consectetur cumque sit ullam internos sit pariatur excepturi sed ducimus velit non esse aperiam? Est recusandae voluptas est dolor quos aut enim nihil aut consectetur sunt et molestiae fugiat. Non quia omnis ut labore numquam ex perferendis laboriosam quo accusantium consequuntur. ",
        nightlyRate: 900,
        cleaningFee: 1000,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
