export async function fetchConfig() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/get-config', {method: "GET"});
    if (!res.ok) {
        throw new Error(res.json().toString());
    }
    const data = await res.json();
    return data as IConfig;
}