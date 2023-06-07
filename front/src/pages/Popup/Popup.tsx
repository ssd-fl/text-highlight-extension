import { Box, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { Completion } from "../../@types/Summary";
import { IAction } from "../../@types/action";
import ActionBar from "../../components/ActionBar";
import CardList from "../../components/CardList";
import ActionContext from "../../context";
import { CompletionService } from "../../services/chrome";
import "./Popup.css";

const Popup = (): JSX.Element => {
  const [enable, setEnable] = useState(false);
  const [action, setAction] = useState<IAction>({
    filter: "",
    sort: "asc",
  });

  const [completions, setCompletions] = useState<Completion[]>([]);

  useEffect(() => {
    const getHistory = async () => {
      const history = await CompletionService.getCompletion();
      const com = Object.values(history).map((v) => JSON.parse(v));
      setCompletions(com);
    };
    const getEnable = async () => {
      const enableFeature = await CompletionService.getEnableOption();
      setEnable(enableFeature === "enable");
    };
    getHistory();
    getEnable();
  }, []);

  const updateEnable = async (option: boolean) => {
    let opt = option ? "enable" : "disable";
    await CompletionService.saveEnableOption(option);
    setEnable(option);

    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const activeTab = tabs[0];
      let tID = activeTab.id ?? -1;

      if (activeTab && activeTab.id !== undefined) {
        chrome.tabs.sendMessage(tID, { type: "update-enable", content: opt });
      }
    });
  };

  return (
    <Box className="App">
      <Box display="flex" justifyContent={"flex-end"}>
        <Switch
          checked={enable}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateEnable(e.target.checked)
          }
        />
      </Box>
      <ActionContext.Provider value={{ action, setAction }}>
        <Box width={"100%"}>
          <ActionBar />
          <CardList items={completions} />
        </Box>
      </ActionContext.Provider>
    </Box>
  );
};

export default Popup;
