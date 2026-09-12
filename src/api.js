const BASE=(import.meta.env.VITE_API_BASE_URL||`http://${location.hostname}:8005`).replace(/\/$/,'');
const CLIENT=import.meta.env.VITE_CLIENT_ID||'demo';
const token=()=>localStorage.getItem('gold365_admin_token')||'';
export async function api(path,{method='GET',body,auth=true}={}){
  const res=await fetch(`${BASE}${path}`,{method,headers:{'Content-Type':'application/json',...(auth&&token()?{Authorization:`Bearer ${token()}`}:{})},body:body===undefined?undefined:JSON.stringify(body)});
  const data=await res.json().catch(()=>({detail:`HTTP ${res.status}`}));
  if(!res.ok) throw new Error(data.detail||data.message||`HTTP ${res.status}`);
  return data;
}
export const clientId=CLIENT;
export const endpoints={
 login:(body)=>api('/admin/login',{method:'POST',body,auth:false}),
 me:()=>api('/admin/me'),
 summary:()=>api('/api/admin/operations/summary'),
 users:()=>api(`/auth/users?client_id=${encodeURIComponent(CLIENT)}`,{auth:false}),
 updateUser:(id,body)=>api(`/auth/users/${id}?client_id=${encodeURIComponent(CLIENT)}`,{method:'PUT',body,auth:false}),
 bets:()=>api('/api/admin/bets?limit=100'),
 markets:()=>api('/api/admin/games/matka/markets'),
 saveMarkets:(markets)=>api('/api/admin/games/matka/markets',{method:'PUT',body:{markets}}),
 games:()=>api('/api/admin/games'),
 settings:()=>api('/api/admin/casino-settings'),
 saveSettings:(body)=>api('/api/admin/casino-settings',{method:'PUT',body}),
 matkaPublish:(body)=>api('/api/admin/games/matka/results',{method:'POST',body}),
 dbHealth:()=>api('/api/admin/database/health')
};
