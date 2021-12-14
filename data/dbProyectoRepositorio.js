const { pool } = require("../config/pool.config");
class DbProyectoRepositorio {
  constructor() {
    this.cursor = null;
  }

  async get_proyectos(data) {
    const proyectos = await pool.query(
      `SELECT p.*, tipo as categoria 
      FROM proyectos as p 
	    INNER JOIN categoria_proyectos 
      ON p.categoria_id = categoria_proyectos.id
	    WHERE p.estado=true`
    );
    return proyectos;
  }
  async get_proyecto(data) {
    const { id } = data.params;
    const proyecto = await pool.query(
      `SELECT p.*, tipo as categoria 
      FROM proyectos as p 
      INNER JOIN categoria_proyectos 
      ON p.categoria_id = categoria_proyectos.id 
      WHERE p.id=$1 `,
      [id]
    );
    return proyecto;
  }
  async create_proyecto(data) {
    debugger;
    const {
      titulo,
      descripcion,
      objetivo,
      lider,
      numero_participantes,
      fecha_inicio,
      fecha_fin,
      estado,
      categoria,
      informacion_adicional,
      url_imagen,
    } = data;
    let numero_participantes_oficial = numero_participantes;
    if (numero_participantes_oficial == null) {
      numero_participantes_oficial = 0;
    }
    const categoria_db = await pool.query(
      "SELECT * FROM public.categoria_proyectos WHERE tipo = $1",
      [categoria]
    );
    const categoria_id =
      categoria_db.rowCount > 0 ? categoria_db.rows[0].id : null;
    
    
    
      //Conversion de fechas string a Date
    let fecI;
    let fecF;
    let newEstado;
    let fechaActual= new Date();
    if(fecha_inicio!=""){
      const [yearI, monthI,dayI ] = fecha_inicio.split("-")
      fecI= new Date(monthI+' '+dayI+' '+yearI);  
    }else{
      fecI = fechaActual;  
    }
    if(estado){

      if(fecha_fin!=""){
        const [yearF, monthF,dayF ] = fecha_fin.split("-")
        fecF=new Date(monthF+' '+dayF+' '+yearF);
        //ve el caso de la fecha final sea menor a la actual dependiendo de eso es un proyecto pasado o en curso
        if(fecF < fechaActual ){
          newEstado=false;
        }else{
          newEstado = true;
        }
        //el caso que la fecha inicial es mayor a la final
        if(fecF<fecI){
          fecF=null;
        }
      }else{
        fecF=null;
        newEstado = true;
      }
    }else{
      if(fecI > fechaActual){
        fecF=null;
        newEstado=true;
      }else{
        fecF=fechaActual;
        newEstado=false;
      }
    }
    const new_proyeto = await pool.query(
      "INSERT INTO proyectos(titulo, descripcion, objetivo, lider, numero_participantes, estado, fecha_inicio,fecha_fin,categoria_id,visualizar,informacion_adicional,url_imagen)VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12)",
      [
        titulo, //1
        descripcion,//2
        objetivo,//3
        lider,//4
        numero_participantes_oficial,//5
        newEstado,//6
        fecI,//7
        fecF,//8
        categoria_id,//9
        true,//10
        informacion_adicional,//11
        url_imagen,//12
      ]
    );
    const proyecto_to_show = await pool.query(
      "SELECT p.*, tipo as categoria FROM proyectos as p INNER JOIN categoria_proyectos ON p.categoria_id = categoria_proyectos.id  ORDER BY ID DESC LIMIT 1"
    );  
    return proyecto_to_show;
  }

  async update_proyecto(id, data) {
    const {
      titulo,
      descripcion,
      objetivo,
      lider,
      numero_participantes,
      fecha_inicio,
      fecha_fin,
      estado,
      categoria,
      informacion_adicional,
      url_imagen
    }  = data;
    const categoria_db = await pool.query(
      "SELECT * FROM public.categoria_proyectos WHERE tipo = $1",
      [categoria]
    );
    var categoria_id;
    const categorias_id =
      categoria_db.rowCount > 0 ? categoria_db.rows[0].id : null;
    if (categorias_id == null) {
      var categoria_id_oficial = await pool.query(
        "SELECT categoria_id FROM public.proyectos WHERE id = $1",
        [id]
      );
      categoria_id = categoria_id_oficial.rows[0].categoria_id;
    } else {
      categoria_id = categorias_id;
    }


    let fecI;
    let fecF;
    let newEstado;
    let fechaActual=new Date();
    let query="UPDATE proyectos SET titulo=coalesce($2,titulo), descripcion=coalesce($3,descripcion), objetivo=coalesce($4,objetivo), lider=coalesce($5,lider),numero_participantes=coalesce($6,numero_participantes),estado=coalesce($7,estado), fecha_inicio=coalesce($13,fecha_inicio), fecha_fin=coalesce($8,fecha_fin), categoria_id=coalesce($9,categoria_id), visualizar=coalesce($10,visualizar), informacion_adicional=coalesce($11,informacion_adicional), url_imagen=coalesce($12,url_imagen) WHERE id = $1";
    
    
    if(fecha_inicio!=""){
      const [yearI, monthI,dayI ] = fecha_inicio.split("-")
      fecI= new Date(monthI+' '+dayI+' '+yearI);  
    }else{
      fecI=null;
    }

    if(estado){
      if(fecha_fin!=""){
        const [yearF, monthF,dayF ] = fecha_fin.split("-")
        fecF=new Date(monthF+' '+dayF+' '+yearF);
        //ve el caso de la fecha final sea menor a la actual dependiendo de eso es un proyecto pasado o en curso
        if(fecF < fechaActual ){
          newEstado = false;
        }else{
          newEstado = true;
        }
        //el caso que la fecha inicial es mayor a la final
        if(fecF<fecI){
          fecF=null;
        }
      }else{
        fecF=null;
      }
    }else{

      if(fecha_fin!=""){
        const [yearF, monthF,dayF ] = fecha_fin.split("-")
        fecF=new Date(monthF+' '+dayF+' '+yearF);
        if(fecF < fechaActual ){
          newEstado = false;
        }else{
          newEstado = true;
        }
      }else{
        fecF=fechaActual;
        newEstado=false;
      }
    }
    const proyecto_a_actualizar = await pool.query(
      query,
      [
        id,
        titulo,
        descripcion,
        objetivo,
        lider,
        numero_participantes,
        newEstado,
        fecF,
        categoria_id,
        true,
        informacion_adicional,
        url_imagen,
        fecI,
      ]
    );
    const proyecto = await pool.query(
      "SELECT p.*, tipo as categoria  FROM proyectos as p INNER JOIN categoria_proyectos ON p.categoria_id = categoria_proyectos.id WHERE p.id=$1",
      [id]
    );

    return proyecto;
  }

  async participate_proyecto(id, id_usuario) {
    //si existe un usuario no tiene que aumentar

    const res1 = Boolean(
      (
        await pool.query(
          "SELECT EXISTS(select id_usuario from usuarios where id_usuario=$1)",
          [id_usuario]
        )
      ).rows[0]["exists"]
    );
    const res = Boolean(
      (
        await pool.query(
          "SELECT NOT EXISTS( SELECT id_usuario FROM participantes_proyectos WHERE id_usuario=$1 and id_proyecto=$2)",
          [id_usuario, id]
        )
      ).rows[0]["?column?"]
    );
    if (res && res1) {
      const participate_proyecto = await pool.query(
        "INSERT INTO participantes_proyectos(id_usuario, id_proyecto)VALUES((select id_usuario from usuarios where id_usuario=$1),$2)",
        [id_usuario, id]
      );
      const incrementar_participantes = await pool.query(
        "UPDATE proyectos SET numero_participantes=numero_participantes+1 WHERE id=$1",
        [id]
      );
    }
    return res && res1;
  }

  async participation(id, id_autenticacion) {
    const res1 = Boolean(
      (
        await pool.query(
          "SELECT EXISTS(select id_participantes_proyectos from participantes_proyectos where id_usuario=$1 and id_proyecto=$2)",
          [id_autenticacion, id]
        )
      ).rows[0]["exists"]
    );
    return res1;
  }

  async delete_proyecto(id) {
    const proyecto_a_eliminar = await pool.query(
      "DELETE FROM proyectos WHERE id = $1",
      [id]
    );
    const eliminar_voluntarios_proyecto = await pool.query(
      "DELETE FROM public.participantes_proyectos WHERE id_proyecto = $1",
      [id]
    );
    return proyecto_a_eliminar;
  }
  async get_participantes_proyecto_simple(id) {
    const existeProyecto = Boolean(
      (
        await pool.query(
          "SELECT EXISTS(select id from public.proyectos where id=$1)",
          [id]
        )
      ).rows[0]["exists"]
    );
    if (existeProyecto) {
      const participantsSimple = await pool.query(
        "SELECT us.id_usuario,us.nombre,us.apellido,us.rol,proy.titulo,us.telefono,proy.fecha_inicio,proy.fecha_fin FROM public.participantes_proyectos as pro, public.usuarios as us,public.proyectos as proy where pro.id_usuario=us.id_usuario and pro.id_proyecto=$1 and proy.id=pro.id_proyecto",
        [id]
      );
      return participantsSimple;
    }
    return existeProyecto;
  }
  async get_categorias_proyectos(categoria) {
    const categorias = await pool.query(
      "SELECT proyectos.*, tipo as categoria FROM public.proyectos INNER JOIN public.categoria_proyectos ON proyectos.categoria_id = categoria_proyectos.id WHERE categoria_proyectos.tipo = $1 and estado=true",
      [categoria]
    );
    return categorias;
  }
  async get_categorias() {
    const categorias = await pool.query(
      "SELECT * FROM public.categoria_proyectos ORDER BY id ASC"
    );
    return categorias;
  }
  async cancel_participate_proyecto(id, id_autenticacion) {
    const res1 = Boolean(
      (
        await pool.query(
          "SELECT EXISTS(select id_usuario from participantes_proyectos where id_usuario=$1)",
          [id_autenticacion]
        )
      ).rows[0]["exists"]
    );
    const res = Boolean(
      (
        await pool.query(
          "SELECT EXISTS(select id_proyecto from participantes_proyectos where id_proyecto=$1)",
          [id]
        )
      ).rows[0]["exists"]
    );
    if (res && res1) {
      const cancel_participate_proyecto = await pool.query(
        "DELETE FROM public.participantes_proyectos WHERE id_usuario=$1 and id_proyecto=$2",
        [id_autenticacion, id]
      );
      const decrementar_participantes = await pool.query(
        "UPDATE proyectos SET numero_participantes=numero_participantes-1 WHERE id=$1",
        [id]
      );
    }
    return res && res1;
  }

  async get_my_proyectos(id_autenticacion) {
    const existe_usuario = Boolean(
      (
        await pool.query(
          "SELECT EXISTS(select id_usuario from participantes_proyectos where id_usuario=$1)",
          [id_autenticacion]
        )
      ).rows[0]["exists"]
    );
    if (existe_usuario) {
      const my_proyectos = await pool.query(
        "select p.*, tipo as categoria from proyectos as p INNER JOIN categoria_proyectos ON p.categoria_id = categoria_proyectos.id  where exists (select par.id_proyecto from participantes_proyectos par where par.id_usuario=$1 and p.id = par.id_proyecto) ",
        [id_autenticacion]
      );
      return my_proyectos;
    }
    return existe_usuario;
  }

  async get_lideres() {
    const lideres = await pool.query(
      "SELECT nombre FROM public.usuarios WHERE estado_de_disponibilidad='disponible' and estado_de_cuenta='activa' and rol='lider'"
    );
    return lideres;
  }

  async get_roles() {
    const roles = await pool.query(
      "SELECT DISTINCT rol FROM public.usuarios WHERE estado_de_disponibilidad='disponible' and estado_de_cuenta='activa'"
    );
    return roles;
  }

  async get_rol(id_autenticacion) {
    const rol = await pool.query(
      "SELECT rol FROM public.usuarios WHERE id_usuario = $1",
      [id_autenticacion]
    );
    return rol;
  }

  async get_numero_participantes(id_proyecto) {
    const numero_participantes_proyecto = await pool.query(
      "select count(id_usuario) from public.participantes_proyectos WHERE id_proyecto=$1",
      [id_proyecto]
    );
    const res = numero_participantes_proyecto.rows[0];

    return res;
  }
  async get_eventos_proyecto(id_proyecto) {
    const eventos = await pool.query(
      "SELECT * FROM public.eventos WHERE id_proyecto=$1",
      [id_proyecto]
    );

    return eventos;
  }

  async get_proyectos_acabado() {
    const proyectos_acabados = await pool.query(
      //************* */     'ACABADO' = false
      "SELECT p.*, cat.tipo as categoria FROM public.proyectos p,public.categoria_proyectos as cat WHERE estado=false and p.categoria_id=cat.id"
    );
    return proyectos_acabados;
  }

  async get_proyectos_pasados_categoria(categoria) {
    const proyectos_acabados = await pool.query(
      //************* */     'ACABADO' = false
      "SELECT proyectos.*,categoria_proyectos.tipo as categoria FROM public.proyectos INNER JOIN public.categoria_proyectos ON proyectos.categoria_id = categoria_proyectos.id WHERE categoria_proyectos.tipo = $1 and estado=false",
      [categoria]
    );
    return proyectos_acabados;
  }

  async participate_past_proyecto(id_proyecto, id_autenticacion, id_usuario) {
    const proyecto_existence = Boolean(
      (
        await pool.query(
          //************* */     'ACABADO' = false
          "SELECT EXISTS (SELECT * from proyectos where id=$1 and estado=false)",
          [id_proyecto]
        )
      ).rows[0]["exists"]
    );
    const core_team_existence = Boolean(
      (
        await pool.query(
          "SELECT EXISTS (SELECT * from usuarios where id_usuario=$1 and rol='core team')",
          [id_autenticacion]
        )
      ).rows[0]["exists"]
    );
    const usuario_existence = Boolean(
      (
        await pool.query(
          "SELECT EXISTS (SELECT * from usuarios where id_usuario=$1)",
          [id_usuario]
        )
      ).rows[0]["exists"]
    );
    const usuario_participate = Boolean(
      (
        await pool.query(
          "SELECT EXISTS(select * from participantes_proyectos where id_usuario=$1 and id_proyecto=$2)",
          [id_usuario, id_proyecto]
        )
      ).rows[0]["exists"]
    );
    if (
      proyecto_existence == true &&
      core_team_existence == true &&
      usuario_existence == true &&
      usuario_participate == false
    ) {
      const participate_proyecto = await pool.query(
        "INSERT INTO participantes_proyectos(id_usuario, id_proyecto)VALUES($1,$2)",
        [id_usuario, id_proyecto]
      );
      const incrementar_participantes = await pool.query(
        "UPDATE proyectos SET numero_participantes=numero_participantes+1 WHERE id=$1",
        [id_proyecto]
      );
    }
    return (
      proyecto_existence == true &&
      core_team_existence == true &&
      usuario_existence == true &&
      usuario_participate == false
    );
  }

  async get_usuarios() {
    const usuarios = await pool.query(
      "SELECT id_usuario,(nombre ||' '|| apellido)as nombre_completo,telefono FROM public.usuarios"
    );
    return usuarios;
  }

  async create_imagen(filename, mimetype, size, filepath, id_proyecto) {
    const imagenes_desactivadas = await pool.query(
      "UPDATE public.imagenes_proyectos SET activo=false where id_proyecto=$1",
      [parseInt(id_proyecto)]
    );
    const activo = true;
    const nueva_imagen = await pool.query(
      "INSERT INTO public.imagenes_proyectos(filename,filepath,mimetype,size,id_proyecto,activo) VALUES ($1,$2,$3,$4,$5,$6)",
      [filename, filepath, mimetype, size, id_proyecto, activo]
    );
    const imagen = await pool.query(
      "SELECT * from public.imagenes_proyectos WHERE activo=true and id_proyecto=$1",
      [parseInt(id_proyecto)]
    );
    return imagen;
  }

  async get_imagen(id_proyecto) {
    const imagen = await pool.query(
      "SELECT * from public.imagenes_proyectos WHERE activo=true and id_proyecto=$1",
      [parseInt(id_proyecto)]
    );
    return imagen;
  }

  async get_lista_eventos_para_proyectos(id_proyecto) {
    const eventos = await pool.query(
      "SELECT nombre_evento, descripcion_evento, modalidad_evento, lugar_evento, fecha_evento, proyecto, categoria, hora_inicio, hora_fin, lider FROM eventos WHERE id_proyecto=$1",
      [parseInt(id_proyecto)]
    );
    return eventos;
  }

  async get_lista_por_proyecto(proyecto) {
    const eventos = await pool.query(
      "SELECT nombre_evento, descripcion_evento, modalidad_evento, lugar_evento, fecha_evento, proyecto, categoria, hora_inicio, hora_fin, lider FROM eventos WHERE proyecto=$1",
      [proyecto]
    );
    return eventos;
  }

}

module.exports = DbProyectoRepositorio;
