var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it('decreases quality & sellIn value by 1 each day for Common items', () => {
    // set up
    const commonItems = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Elixir of the Mongoose", 5, 7)
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
      new Item("Aged Brie", 2, 0)
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
      new Item('Sulfuras, Hand of Ragnaros', 0, 80)
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
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)
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
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)
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
      new Item('Backstage passes to a TAFKAL80ETC concert', 3, 30)
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
      new Item('Conjured Mana Cake', 3, 6)
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

});
