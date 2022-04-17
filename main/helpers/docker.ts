import Dockerode from 'dockerode';
import { ipcMain } from 'electron';
import { createErrorWindow } from './create-window';

const checkDocker = async () => {
    try {
        switch (process.platform) {
            case "win32": {
                var docker = new Dockerode({ socketPath: '//./pipe/docker_engine' })
            }
            default:{
                var docker = new Dockerode({ socketPath: '/var/run/docker.sock' })
            }
        }
        let dockerVersion = await docker.version()
        console.log("Docker is running")
        console.log(`Docker Verion:${dockerVersion.Version}`)
        return docker
    } catch (e) {
        console.log("Docker doesn't exist, isn't running, or is having an issue.")
        console.log(e)
    }
}

const checkWRKBOXContainers = async () => {
    try{
        let docker = await checkDocker()
        let getContainerList = docker.listContainers()
        let containerList = getContainerList.then((e) => {return e})
        return containerList
    } catch (e) {
        createErrorWindow('dockererror')
        console.log(e)
    }
}

const getAllContainers = async () => {
    let docker = await checkDocker()
    return docker.listContainers()
}

export { checkWRKBOXContainers }