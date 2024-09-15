import { CheckProperty, ColorProperty, ComboProperty, FloatProperty, FontProperty, GroupProperty, IntegerProperty, LongTextProperty, LostPluginPropertyType, ObjectProperty, PercentProperty, TextProperty } from "lost-lib";

export const PluginProperties: LostPluginPropertyType[] = [
    new IntegerProperty({
        Id: "int",
        Name: "Integer Property",
        Description: "Description...",
        InitialValue: 0,
    }),
    new FloatProperty({
        Id: "float",
        Name: "Float Property",
        InitialValue: 0,
    }),
    new PercentProperty({
        Id: "percent",
        Name: "Percent Property",
        InitialValue: 1,
    }),
    new TextProperty({
        Id: "text",
        Name: "Text Property",
        InitialValue: "",
    }),
    new LongTextProperty({
        Id: "long_text",
        Name: "Long Text Property",
        InitialValue: "",
    }),
    new CheckProperty({
        Id: "check",
        Name: "Check Property",
        InitialValue: false,
    }),
    new FontProperty({
        Id: "font",
        Name: "Font Property",
        InitialValue: "Arial",
    }),
    new ComboProperty({
        Id: "combo",
        Name: "Combo Property",
        InitialValue: "item_one",
        Items: [
            {Id: "item_one", Name: "Item 1"},
            {Id: "item_two", Name: "Item 2"}
        ]
    }),
    new ColorProperty({
        Id: "color",
        Name: "Color Property",
        InitialValue: [1, 0, 0]
    }),
    new ObjectProperty({
        Id: "object",
        Name: "Object Property"
    }),
    new GroupProperty({
        Id: "group",
        Name: "Group Property",
    }),
]