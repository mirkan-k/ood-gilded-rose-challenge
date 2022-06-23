var {
  CommonItem, 
  RareItem, 
  ExclusiveItem, 
  LegendaryItem, 
  ConjuredItem,
  Shop} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it('decreases quality & sellIn value by 1 each day for Common items', () => {
    // set up
    const commonItems = [
      new CommonItem("+5 Dexterity Vest", 10, 20),
      new CommonItem("Elixir of the Mongoose", 5, 7)
    ]

    const gildedRose = new Shop(commonItems);
    const dexVestExpectedSellIn = 9
    const dexVestExpectedQuality = 19
    const elixirExpectedSellIn = 4
    const elixirExpectedQuality = 6
    // execute
    const result = gildedRose.updateQuality()
    // verify
    expect(result[0].name).toEqual(commonItems[0].name);
    expect(result[0].sellIn).toEqual(dexVestExpectedSellIn);
    expect(result[0].quality).toEqual(dexVestExpectedQuality);
    
    expect(result[1].name).toEqual(commonItems[1].name);
    expect(result[1].sellIn).toEqual(elixirExpectedSellIn);
    expect(result[1].quality).toEqual(elixirExpectedQuality);
  });

  it('increases quality & decreases sellIn value by 1 each day for Rare items', () => {
    // set up
    const rareItems = [
      new RareItem("Aged Brie", 2, 0)
    ]

    const gildedRose = new Shop(rareItems);
    const brieExpectedSellIn = 1
    const brieExpectedQuality = 1
    // execute
    const result = gildedRose.updateQuality()
    // verify
    expect(result[0].name).toEqual(rareItems[0].name);
    expect(result[0].sellIn).toEqual(brieExpectedSellIn);
    expect(result[0].quality).toEqual(brieExpectedQuality);
  });

  it('maintians static quality each day for Legendary items', () => {
    // set up
    const legendarySellIn = 0
    const legendaryQuality = 80

    const legendaryItems = [
      new LegendaryItem('Sulfuras, Hand of Ragnaros', 0, 80)
    ]
    const gildedRose = new Shop(legendaryItems);
    // execute
    const result = gildedRose.updateQuality()
    // verify
    expect(result[0].name).toEqual(legendaryItems[0].name);
    expect(result[0].sellIn).toEqual(legendarySellIn);
    expect(result[0].quality).toEqual(legendaryQuality);
  });

  it('decreases sellIn value & increase quality by 1 each day for Exclusive items while sellIn value above 10', () => {
    // set up
    const exclusiveItems = [
      new ExclusiveItem('Backstage passes to a TAFKAL80ETC concert', 15, 20)
    ]

    const gildedRose = new Shop(exclusiveItems);
    const exclusiveExpectedSellIn = 14
    const exclusiveExpectedQuality = 21
    // execute
    const result = gildedRose.updateQuality()
    // verify
    expect(result[0].name).toEqual(exclusiveItems[0].name);
    expect(result[0].sellIn).toEqual(exclusiveExpectedSellIn);
    expect(result[0].quality).toEqual(exclusiveExpectedQuality);
  });

  it('increases quality by 2 each day for Exclusive items while sellIn value 10 or below', () => {
    // set up
    const exclusiveItems = [
      new ExclusiveItem('Backstage passes to a TAFKAL80ETC concert', 10, 20)
    ]

    const gildedRose = new Shop(exclusiveItems);
    const exclusiveExpectedSellIn = 9
    const exclusiveExpectedQuality = 22
    // execute
    const result = gildedRose.updateQuality()
    // verify
    expect(result[0].name).toEqual(exclusiveItems[0].name);
    expect(result[0].sellIn).toEqual(exclusiveExpectedSellIn);
    expect(result[0].quality).toEqual(exclusiveExpectedQuality);
  });

  it('increases quality by 3 each day for Exclusive items while sellIn value 5 or below', () => {
    // set up
    const exclusiveItems = [
      new ExclusiveItem('Backstage passes to a TAFKAL80ETC concert', 3, 30)
    ]

    const gildedRose = new Shop(exclusiveItems);
    const exclusiveExpectedSellIn = 2
    const exclusiveExpectedQuality = 33
    // execute
    const result = gildedRose.updateQuality()
    // verify
    expect(result[0].name).toEqual(exclusiveItems[0].name);
    expect(result[0].sellIn).toEqual(exclusiveExpectedSellIn);
    expect(result[0].quality).toEqual(exclusiveExpectedQuality);
  });

  it('decreases quality by 2 & sellIn value by 1 each day for Conjured items', () => {
    // set up
    const conjuredItems = [
      new ConjuredItem('Conjured Mana Cake', 3, 6)
    ]
    const gildedRose = new Shop(conjuredItems);
    const conjExpectedSellIn = 2
    const conjExpectedQuality = 4
    // execute
    const result = gildedRose.updateQuality()
    // verify
    expect(result[0].name).toEqual(conjuredItems[0].name);
    expect(result[0].sellIn).toEqual(conjExpectedSellIn);
    expect(result[0].quality).toEqual(conjExpectedQuality);
  });

  it('does not let quality go above 50 for Common Items, Rare Items, Exclusive Items and Conjured Items', () => {
    // set up
    const items = [
      new CommonItem("+5 Dexterity Vest", 10, 55),
      new CommonItem("Elixir of the Mongoose", 5, 70),
      new RareItem("Aged Brie", -1, 49),
      new ExclusiveItem('Backstage passes to a TAFKAL80ETC concert', 3, 49),
      new ConjuredItem('Conjured Mana Cake', 3, 60)
    ]

    const gildedRose = new Shop(items);
    const expected = [
      {name: "+5 Dexterity Vest", sellIn: 9, quality: 50},
      {name: "Elixir of the Mongoose", sellIn: 4, quality: 50},
      {name: "Aged Brie", sellIn: -2, quality: 50},
      {name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 2, quality: 50},
      {name: 'Conjured Mana Cake', sellIn: 2, quality: 50}
    ]
    // execute
    const result = gildedRose.updateQuality()
    // verify
    expect(result[0].name).toEqual(expected[0].name);
    expect(result[0].sellIn).toEqual(expected[0].sellIn);
    expect(result[0].quality).toEqual(expected[0].quality);

    expect(result[1].name).toEqual(expected[1].name);
    expect(result[1].sellIn).toEqual(expected[1].sellIn);
    expect(result[1].quality).toEqual(expected[1].quality);

    expect(result[2].name).toEqual(expected[2].name);
    expect(result[2].sellIn).toEqual(expected[2].sellIn);
    expect(result[2].quality).toEqual(expected[2].quality);

    expect(result[3].name).toEqual(expected[3].name);
    expect(result[3].sellIn).toEqual(expected[3].sellIn);
    expect(result[3].quality).toEqual(expected[3].quality);

    expect(result[4].name).toEqual(expected[4].name);
    expect(result[4].sellIn).toEqual(expected[4].sellIn);
    expect(result[4].quality).toEqual(expected[4].quality);
  });

  it('does not allow quality to go to the negatives for all item types', () => {
    // set up
    const items = [
      new CommonItem("+5 Dexterity Vest", 10, 0),
      new CommonItem("Elixir of the Mongoose", 5, -5),
      new RareItem("Aged Brie", -1, -1),
      new ExclusiveItem('Backstage passes to a TAFKAL80ETC concert', 3, -5),
      new LegendaryItem('Sulfuras, Hand of Ragnaros', 0, -10),
      new ConjuredItem('Conjured Mana Cake', -2, 1)
    ]

    const gildedRose = new Shop(items);
    const expected = [
      {name: "+5 Dexterity Vest", sellIn: 9, quality: 0},
      {name: "Elixir of the Mongoose", sellIn: 4, quality: 0},
      {name: "Aged Brie", sellIn: -2, quality: 2},
      {name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 2, quality: 3},
      {name: 'Sulfuras, Hand of Ragnaros', sellIn:  0, quality: 80},
      {name: 'Conjured Mana Cake', sellIn: -3, quality: 0}
    ]
    // execute
    const result = gildedRose.updateQuality()
    // verify
    expect(result[0].name).toEqual(expected[0].name);
    expect(result[0].sellIn).toEqual(expected[0].sellIn);
    expect(result[0].quality).toEqual(expected[0].quality);

    expect(result[1].name).toEqual(expected[1].name);
    expect(result[1].sellIn).toEqual(expected[1].sellIn);
    expect(result[1].quality).toEqual(expected[1].quality);

    expect(result[2].name).toEqual(expected[2].name);
    expect(result[2].sellIn).toEqual(expected[2].sellIn);
    expect(result[2].quality).toEqual(expected[2].quality);

    expect(result[3].name).toEqual(expected[3].name);
    expect(result[3].sellIn).toEqual(expected[3].sellIn);
    expect(result[3].quality).toEqual(expected[3].quality);

    expect(result[4].name).toEqual(expected[4].name);
    expect(result[4].sellIn).toEqual(expected[4].sellIn);
    expect(result[4].quality).toEqual(expected[4].quality);
  });

});