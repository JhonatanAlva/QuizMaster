firebase.initializeApp({
    apiKey: "AIzaSyB6TK0bHCk35TeAbe0BqMGHWLxfjfEdGbI",
    authDomain: "quizmaster-38a6b.firebaseapp.com",
    databaseURL: "https://quizmaster-38a6b-default-rtdb.firebaseio.com",
    projectId: "quizmaster-38a6b",
    storageBucket: "quizmaster-38a6b.appspot.com",
    messagingSenderId: "169546556534",
    appId: "1:169546556534:web:cc7dbfb16ccbf639e92b57",
    measurementId: "G-FQSP9SF6PM",
  });
  
 
  const userCollection = firebase.firestore().collection("User");

  async function obtenerUsuarios() {
      const userSnapshot = await userCollection.get();
      const users = [];
      userSnapshot.forEach(doc => {
          users.push({ id: doc.id, ...doc.data() });
      });
      return users;
  }

  async function buscarUsuariosPorNombre(nameUser) {
      const userSnapshot = await userCollection.where("NameUser", "==", nameUser).get();
      const users = [];
      userSnapshot.forEach(doc => {
          users.push({ id: doc.id, ...doc.data() });
      });
      return users;
  }

  function actualizarTablaUsuarios(users) {
      const userList = document.querySelector(".userList");
      userList.innerHTML = "";
      users.forEach(user => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${user.NameUser}</td>
              <td>${user.Correo}</td>
              <td>${user.Edad}</td>
              <td>${user.fichas}</td>
              <td>
                  <button class="btn btn-danger" onclick="eliminarUsuario('${user.NameUser}', '${user.Correo}')">X</button>
              </td>
          `;
          userList.appendChild(row);
      });
  }

  async function eliminarUsuario(nameUser, email) {
      try {
          const querySnapshot = await userCollection
              .where("NameUser", "==", nameUser)
              .where("Correo", "==", email)
              .get();
          querySnapshot.forEach(async doc => {
              await userCollection.doc(doc.id).delete();
          });
          alert("Usuario eliminado correctamente");
          const users = await obtenerUsuarios();
          actualizarTablaUsuarios(users);
      } catch (error) {
          console.error("Error al eliminar el usuario:", error);
      }
  }

  window.addEventListener("DOMContentLoaded", async () => {
      const searchForm = document.getElementById("searchForm");

      // Mostrar todos los usuarios al cargar la página
      const users = await obtenerUsuarios();
      actualizarTablaUsuarios(users);

      searchForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const searchInput = document.getElementById("buscarNameUser").value.trim();
          if (searchInput) {
              const users = await buscarUsuariosPorNombre(searchInput);
              actualizarTablaUsuarios(users);
          } else {
              const users = await obtenerUsuarios();
              actualizarTablaUsuarios(users);
          }
      });
  });