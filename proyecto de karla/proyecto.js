let datos = [];

        document.getElementById('formRegistro').addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const carrera = document.getElementById('carrera').value;
            const curso = document.getElementById('curso').value;
            const n1 = parseInt(document.getElementById('n1').value);
            const n2 = parseInt(document.getElementById('n2').value);
            const n3 = parseInt(document.getElementById('n3').value);
            const n4 = parseInt(document.getElementById('n4').value);
            if (!nombre) {
                alert('Ingrese nombre');
            } else if (!carrera) {
                alert('Seleccione carrera');
            } else if (!curso) {
                alert('Ingrese curso');
            } else if (n1 < 0 || n1 > 20) {
                alert('Nota 1 invalida');
            } else if (n2 < 0 || n2 > 20) {
                alert('Nota 2 invalida');
            } else if (n3 < 0 || n3 > 20) {
                alert('Nota 3 invalida');
            } else if (n4 < 0 || n4 > 20) {
                alert('Nota 4 invalida');
            } else {
                // Calcular promedio
                const promedio = Math.round((n1 + n2 + n3 + n4) / 4);
                
                // Determinar estado con if-else
                let estado = '';
                let clase = '';
                
                if (promedio < 9) {
                    estado = 'REPROBADO';
                    clase = 'reprobado';
                } else if (promedio >= 9 && promedio <= 12) {
                    estado = 'RECUPERACIÓN';
                    clase = 'recuperacion';
                } else if (promedio > 12) {
                    estado = 'APROBADO';
                    clase = 'aprobado';
                }
                
                // Agregar datos
                datos.push({
                    nombre, carrera, curso, n1, n2, n3, n4, promedio, estado, clase
                });
                
                // Actualizar tabla
                actualizarTabla();
                
                // Limpiar form
                this.reset();
                
                // Mensaje según estado
                if (estado === 'APROBADO') {
                    alert(`✓ ${nombre} APROBÓ con ${promedio}`);
                } else if (estado === 'RECUPERACIÓN') {
                    alert(`⚠ ${nombre} a RECUPERACIÓN con ${promedio}`);
                } else if (estado === 'REPROBADO') {
                    alert(`✗ ${nombre} REPROBÓ con ${promedio}`);
                }
            }
        });
        
        function actualizarTabla() {
            const tbody = document.getElementById('tbody');
            tbody.innerHTML = '';
            
            if (datos.length === 0) {
                tbody.innerHTML = '<tr><td colspan="9">Sin registros</td></tr>';
            } else {
                for (let i = 0; i < datos.length; i++) {
                    const d = datos[i];
                    const fila = tbody.insertRow();
                    
                    // Color según estado
                    if (d.estado === 'APROBADO') {
                        fila.style.background = '#e7f5e7';
                    } else if (d.estado === 'RECUPERACIÓN') {
                        fila.style.background = '#fff9e7';
                    } else if (d.estado === 'REPROBADO') {
                        fila.style.background = '#ffe7e7';
                    }
                    
                    fila.innerHTML = `
                        <td>${d.nombre}</td>
                        <td>${d.carrera}</td>
                        <td>${d.curso}</td>
                        <td>${d.n1}</td>
                        <td>${d.n2}</td>
                        <td>${d.n3}</td>
                        <td>${d.n4}</td>
                        <td><b>${d.promedio}</b></td>
                        <td><span class="${d.clase}">${d.estado}</span></td>
                    `;
                }
            }
        }
        actualizarTabla();