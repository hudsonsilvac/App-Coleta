import React from "react";
import { black, grey, white } from "../../constants/colors";
import Text from "../text";

import { IndexProps } from "./models";
import { Item, Main, Separator } from "./style";

const List: React.FC<IndexProps> = ({
    data,
    selected,
    setSelected
}) => {
    return (
        <Main
            data={data}
            renderItem={
                ({item, index}) => (
                    <Item
                        bgColor={index === selected ? item.selected : grey}
                        onPress={() => setSelected(index)}
                    >
                        <Text
                            text={item.text}
                            type='H4'
                            weight='600'
                            color={index === selected ? white : black}
                        />
                    </Item>
                )
            }
            ItemSeparatorComponent={<Separator />}
            horizontal
            pagingEnabled
        />
    )
}

export default List;