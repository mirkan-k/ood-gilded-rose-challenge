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

});
