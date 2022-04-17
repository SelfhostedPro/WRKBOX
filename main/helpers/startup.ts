import { BrowserWindow } from "electron"
import {checkWRKBOXContainers} from "."

const startUpHandler = async (message:string, window:BrowserWindow) => {
    switch(message){
        case 'get-containers': {
            let containers = await checkWRKBOXContainers()
            return JSON.stringify(containers)
        }
    }
}


export {
  startUpHandler
}
