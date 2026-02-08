import { pool } from '../backend/db/mysql'
import type { RowDataPacket } from 'mysql2';

interface LoginResult extends RowDataPacket {
  id: number,
  user: string,
  pass: string,
  nama_lengkap: string
}
export async function handleLogin(req: Request, corsHeaders: Record<string, string>) {
    try {
      let body: any;
        body = await req.json();
        // const passwordHash = await Bun.password.hash(password, { algorithm: 'bcrypt', cost: 12 });

        const [rows] = await pool.query<LoginResult[]>(`SELECT 
          t1.id, t1.username as user,t2.password_hash as pass,t1.nama_lengkap as nama_lengkap 
          from users t1
          left join user_passwords t2 on t2.user_id = t1.id 
          where t1.username = ?`,[body.user]);

        let result: any
        result = rows;
        if (result.length === 0) {
          return new Response(JSON.stringify({ message: 'Gagal User Tidak Ada' }), {
            status: 422,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } else {
          if(await Bun.password.verify(body.pass, result[0].pass)) {
            return new Response(JSON.stringify({ message: 'berhasil' }), {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          } else {
            return new Response(JSON.stringify({ message: 'Password Salah' }), {
              status: 422,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Mysql Connection Error' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
};