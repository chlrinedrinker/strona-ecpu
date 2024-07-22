<script lang="ts">
  export let logowania: { date: string; entrence_time: string; exit_time: string; hours: number }[];
</script>

<div>
  <h2>Logowania</h2>
  <table>
    <thead>
      <tr>
        <th>Data</th>
        <th>Godzina wejścia</th>
        <th>Godzina wyjścia</th>
        <th>Godziny</th>
      </tr>
    </thead>
    <tbody>
      {#each logowania as log}
        <tr>
          <td>{log.date}</td>
          <td>{log.entrence_time}</td>
          <td>{log.exit_time}</td>
          <td>{log.hours}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  table {
      width: 100%;
      border-collapse: collapse;
  }
  th, td {
      border: 1px solid #ddd;
      padding: 8px;
  }
  th {
      background-color: #f4f4f4;
  }
</style>
