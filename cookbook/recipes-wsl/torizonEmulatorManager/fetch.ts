#!/opt/bun/bin/bun

import PATH from "path"
import FS from "fs"
import logger from "node-color-log"
import { execSync } from "child_process"

const ARCH = process.env.ARCH as string
const MACHINE = process.env.MACHINE as string
const MAX_IMG_SIZE = process.env.MAX_IMG_SIZE as string
const BUILD_PATH = process.env.BUILD_PATH as string
const DISTRO_MAJOR = process.env.DISTRO_MAJOR as string
const DISTRO_MINOR = process.env.DISTRO_MINOR as string
const DISTRO_PATCH = process.env.DISTRO_PATCH as string
const USER_PASSWD = process.env.USER_PASSWD as string

// get the actual script path, not the process.cwd
const _path = PATH.dirname(process.argv[1])
const meta = JSON.parse(process.env.META as string)


logger.info(`fetch ${meta.name} ...`)

// create the path only in case
FS.mkdirSync(
    `${BUILD_PATH}/tmp/${MACHINE}/${meta.name}`, { recursive: true }
)

logger.info(`Fetching ${meta.source} ...`)

for (let _file of meta.files) {
    const _file_path = `${BUILD_PATH}/tmp/${MACHINE}/${meta.name}/${_file}`

    execSync(
        `wget ${meta.source}/${_file} -O ${_file_path}`,
        {
            shell: "/bin/bash",
            stdio: "inherit",
            encoding: "utf-8"
        }
    )
}

logger.success(`Fetched ${meta.name}!`)
