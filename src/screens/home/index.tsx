import React, { useState } from "react";
import Main from "../../atomic/atoms/main";

import View from "./view";

const Home: React.FC = () => {
    const [search, setSearch] = useState<string>('')

    return (
        <Main padding statusBar={{ barStyle: 'dark-content' }}>
            <View
                user='Glaziani'
                search={search}
                setSearch={setSearch}
            />
        </Main>
    )
}

export default Home