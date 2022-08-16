import os from 'os'


export default function info(req, res) {
    const objeto = {
      carpeta_proyecto: process.cwd(),
      path_ejecucion: process.execPath,
      plataforma: process.platform,
      argumentos: process.argv.slice(2),
      version_node: process.version,
      process_id: process.pid,
      memoria_total: process.memoryUsage().rss,
      cantidad_cpus: os.cpus().length
    };
  
    res.status(200).json(objeto);
  }