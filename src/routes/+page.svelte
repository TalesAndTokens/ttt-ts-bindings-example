<script lang="ts">
  import type { BaseToken } from "../ttt/tokens";
  import { page } from "$app/stores";

  const tokens: BaseToken[] = $page.data.tokens;
  const checkinLogs: BaseToken[] = $page.data.checkinLogs;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="T&T TypeScript Bindings example" />
</svelte:head>

<section>
  <header>
    <h2>Tokens</h2>

    <p>Your T&T Sandbox Tokens</p>
  </header>

  {#each tokens as token}
    <aside>
      <img src={token.image} alt={token.name} />
      <h3>{token.name}</h3>
      <p>
        {token.description}
      </p>
      <ul>
        {#each token.attributes as attr}
          <li>{attr.trait_type}: {attr.value}</li>
        {/each}
      </ul>
    </aside>
  {/each}
</section>

<section>
  <header>
    <h2>Checkin Logs</h2>

    <p>Your T&T Sandbox checkin logs</p>
  </header>

  {#each checkinLogs as checkinLog}
    <aside>
      <h3>
        {checkinLog.name}
      </h3>
      <p>
        {checkinLog.description}
      </p>
      <ul>
        <li>Count: {checkinLog.count}</li>
        <li>Date: {new Date(checkinLog.timestamp).toDateString()}</li>
      </ul>
    </aside>
  {/each}
</section>
